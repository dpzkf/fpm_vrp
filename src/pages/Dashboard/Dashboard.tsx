import { useCallback, useContext, useEffect, useMemo, useRef, useState } from "react";
import InteractiveMap, {
  FullscreenControl,
  GeolocateControl,
  MapLayerMouseEvent,
  MapRef,
  Marker,
  MarkerDragEvent,
  NavigationControl,
  Popup,
  ScaleControl,
} from "react-map-gl";

import { ActionIcon, Affix, Drawer, LoadingOverlay } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";

import { Text } from "@ui/typography";

import { useIsDesktop } from "@hooks/common";
import { useToast } from "@hooks/common/useToast";

import {
  isRetrieveRoutingProblemResponseWithStatus,
  isRetrieveRoutingProblemUnsolvable,
  TRoutes,
  useGetMultipleDirectionsQuery,
  useLazyGetResolvedVehicleRoutingProblemQuery,
  useLazyGetReverseGeocodingQuery,
  useSubmitVehicleRoutingProblemMutation,
} from "@app/modules";

import { ActiveTabs, Sidebar } from "@components/Sidebar";
import { TVehicleRoutingContext } from "@context/types.ts";
import { VehicleRoutingContext } from "@context/VehicleRoutingContext.tsx";
import { IconMenu2 } from "@tabler/icons-react";
import { feature } from "@turf/helpers";
import { MAX_DROP_OFFS, MAX_PICKUP, VIEW_STATE } from "@utils/constants";
import uniqueId from "lodash.uniqueid";
import { LocationType, TLocation } from "types";
import { v4 as uuidv4 } from "uuid";

import { MapLayers } from "./components";
import * as Styled from "./styles.ts";
import { adaptSubmitData, routeColorMapper, TViewState } from "./utils";

export const Dashboard = () => {
  const mapRef = useRef<MapRef | null>(null);
  const { toastError } = useToast();
  const isDesktop = useIsDesktop();

  const [viewState, setViewState] = useState<TViewState>(VIEW_STATE);
  const [popupInfo, setPopupInfo] = useState<TLocation | null>(null);
  const [shouldRetry, setShouldRetry] = useState<boolean>(false);
  const [submittedData, setSubmittedData] = useState<Record<string, unknown> | null>(null);
  const [isLoadingOverlayVisible, { toggle: toggleLoadingOverlay }] = useDisclosure(false);
  const [openedDrawer, { open, close }] = useDisclosure(false);

  const {
    activeTab,
    addLocation,
    locations,
    updateLocation,
    shipments,
    getDropOffs,
    getWarehouses,
    vehicles,
    changeActiveTab,
    addDirection,
    directions,
  } = useContext(VehicleRoutingContext) as TVehicleRoutingContext;

  const [submitVrp, { data: submitVrpData }] = useSubmitVehicleRoutingProblemMutation();
  const [triggerResolvedVrp, { data: resolvedVrpData }] = useLazyGetResolvedVehicleRoutingProblemQuery();
  const [triggerReverseGeocoding] = useLazyGetReverseGeocodingQuery();
  const { data: directionsData, isLoading: isDerectionsLoading } = useGetMultipleDirectionsQuery(
    { routes: resolvedVrpData?.routes as TRoutes[] },
    {
      skip:
        !resolvedVrpData ||
        isRetrieveRoutingProblemResponseWithStatus(resolvedVrpData) ||
        isRetrieveRoutingProblemUnsolvable(resolvedVrpData),
    },
  );

  const markers = useMemo(
    () =>
      locations.map((location) => (
        <Marker
          key={location.id}
          longitude={location.coordinates[0]}
          latitude={location.coordinates[1]}
          draggable={activeTab === ActiveTabs.LOCATIONS_WAREHOUSES || activeTab === ActiveTabs.LOCATIONS_DROP_OFFS}
          onDragEnd={(e) => handleDrag(e, location.id)}
          onClick={(e) => {
            if (activeTab === ActiveTabs.LOCATIONS_DROP_OFFS || activeTab === ActiveTabs.LOCATIONS_WAREHOUSES) return;
            // If we let the click event propagates to the map, it will immediately close the popup
            // with `closeOnClick: true`
            e.originalEvent.stopPropagation();
            setPopupInfo(location);
          }}
          color={location.type === LocationType.WAREHOUSE ? "var(--warehouse-color)" : "var(--primary-color)"}
        />
      )),
    [locations, activeTab],
  );

  const handleGetResolvedVrp = async () => {
    if (!submitVrpData) return;
    const res = await triggerResolvedVrp({ id: submitVrpData.id }).unwrap();
    if (isRetrieveRoutingProblemUnsolvable(res)) {
      toggleLoadingOverlay();
      return toastError("Неможливо вирішити цю задачу");
    }
    if (isRetrieveRoutingProblemResponseWithStatus(res)) {
      return setShouldRetry((prevState) => !prevState);
    }
    addDirection([]);
    changeActiveTab(ActiveTabs.SOLUTION);
    toggleLoadingOverlay();
    setSubmittedData({ locations, vehicles, shipments });
  };

  useEffect(() => {
    if (!submitVrpData) return;
    const timeoutId = setTimeout(handleGetResolvedVrp, 3000);
    return () => clearTimeout(timeoutId);
  }, [submitVrpData?.id, shouldRetry]);

  useEffect(() => {
    if (!directionsData || isDerectionsLoading) return;
    addDirection(directionsData);
  }, [directionsData, isDerectionsLoading]);

  const generateLineString = useCallback(() => {
    if (directions && activeTab === ActiveTabs.SOLUTION) {
      return directions
        .slice()
        .map(({ routes, isActive }, index) => {
          const lineFeature = routes;
          lineFeature.properties = { color: routeColorMapper(index), width: isActive ? 10 : 5 };
          lineFeature.isActive = isActive;
          return lineFeature;
        })
        .sort((a) => (a.isActive ? 1 : -1));
    }

    if (!shipments) return;

    const coordinates = shipments.reduce((acc: number[][][], shipment) => {
      const fromCoordinates = locations.find((location) => location.name === shipment.from)?.coordinates;
      const toCoordinates = locations.find((location) => location.name === shipment.to)?.coordinates;
      if (fromCoordinates && toCoordinates) {
        acc.push([fromCoordinates, toCoordinates]);
      }
      return acc;
    }, []);

    const geometry = {
      type: "MultiLineString",
      coordinates,
    };

    return feature(geometry);
  }, [shipments, locations, directions, activeTab]);

  const handleSetMarker = async (e: MapLayerMouseEvent) => {
    if (activeTab !== ActiveTabs.LOCATIONS_DROP_OFFS && activeTab !== ActiveTabs.LOCATIONS_WAREHOUSES) return;

    if (
      (getWarehouses().length >= MAX_PICKUP && activeTab === ActiveTabs.LOCATIONS_WAREHOUSES) ||
      (getDropOffs().length >= MAX_DROP_OFFS && activeTab === ActiveTabs.LOCATIONS_DROP_OFFS)
    ) {
      return toastError("Досягнут ліміт");
    }

    const { lng, lat } = e.lngLat;
    const locationName = uniqueId("location-");
    const {
      features: [response],
    } = await triggerReverseGeocoding({ longitude: lng, latitude: lat }).unwrap();

    const newLocation: TLocation = {
      coordinates: [lng, lat],
      name: response?.properties?.name || locationName,
      id: uuidv4(),
      type: activeTab === ActiveTabs.LOCATIONS_WAREHOUSES ? LocationType.WAREHOUSE : LocationType.DROP_OFF,
    };
    addLocation(newLocation);
  };

  const handleDrag = async (e: MarkerDragEvent, locationId: string) => {
    const { lng, lat } = e.lngLat;
    const updatedLocation: Partial<TLocation> = { coordinates: [lng, lat] };
    updateLocation(locationId, updatedLocation);

    const locationName = uniqueId("location-");
    const {
      features: [response],
    } = await triggerReverseGeocoding({ longitude: lng, latitude: lat }).unwrap();
    updateLocation(locationId, { name: response?.properties?.name || locationName });
  };

  const handleFindSolution = async () => {
    toggleLoadingOverlay();
    await submitVrp(adaptSubmitData(locations, shipments, vehicles)).unwrap();
  };

  return (
    <Styled.Wrapper>
      <LoadingOverlay visible={isLoadingOverlayVisible} zIndex={1000} overlayProps={{ radius: "sm", blur: 2 }} />
      {isDesktop ? (
        <Styled.SideBarWrapper>
          <Sidebar handleFindSolution={handleFindSolution} solution={resolvedVrpData} submittedData={submittedData} />
        </Styled.SideBarWrapper>
      ) : (
        <Drawer opened={openedDrawer} onClose={close}>
          <Sidebar handleFindSolution={handleFindSolution} solution={resolvedVrpData} submittedData={submittedData} />
        </Drawer>
      )}
      <Styled.MapWrapper>
        <InteractiveMap
          reuseMaps
          ref={mapRef}
          mapLib={import("mapbox-gl")}
          style={{ width: "100%", height: "100dvh" }}
          mapStyle={import.meta.env.VITE_BASE_MAPBOX_STYLE || ""}
          projection={{ name: "globe" }}
          mapboxAccessToken={import.meta.env.VITE_BASE_MAPBOX_TOKEN || ""}
          onMove={(evt) => setViewState(evt.viewState)}
          onClick={handleSetMarker}
          {...viewState}
        >
          <GeolocateControl position="top-right" />
          {isDesktop && <FullscreenControl position="top-right" />}
          <NavigationControl position="top-right" showCompass={false} />
          <ScaleControl />
          {markers}
          {popupInfo && (
            <Popup
              longitude={popupInfo.coordinates[0]}
              latitude={popupInfo.coordinates[1]}
              offset={10}
              onClose={() => setPopupInfo(null)}
            >
              <Text fw={500}>{popupInfo.name}</Text>
            </Popup>
          )}
          {activeTab !== ActiveTabs.LOCATIONS_WAREHOUSES && activeTab !== ActiveTabs.LOCATIONS_DROP_OFFS && (
            <MapLayers data={generateLineString()} />
          )}
        </InteractiveMap>
        {!isDesktop && !openedDrawer && (
          <Affix position={{ top: 10, left: 10 }}>
            <ActionIcon onClick={open} color="blue" radius="xl" size={60}>
              <IconMenu2 stroke={1.5} size={30} />
            </ActionIcon>
          </Affix>
        )}
      </Styled.MapWrapper>
    </Styled.Wrapper>
  );
};
