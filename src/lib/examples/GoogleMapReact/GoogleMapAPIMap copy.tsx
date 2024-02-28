import { env } from "@/env";
import { silver } from "@/utils/mapStyles";
import { faker } from "@faker-js/faker";
import { GoogleMap, OverlayView, useJsApiLoader } from "@react-google-maps/api";
import Image from "next/image";
import { useState } from "react";

interface Business {
  name: string;
  price: string;
  position: {
    lat: number;
    lng: number;
  };
  avatar: string;
}

// Define your map options
const mapOptions = {
  zoom: 14,
  center: { lat: 37.7749, lng: -122.4194 }, // San Francisco coordinates
};

const businesses: Business[] = [
  {
    name: "Business 1",
    price: "$50",
    position: { lat: 37.775, lng: -122.42 },
    avatar: faker.image.avatar(),
  },
  {
    name: "Business 2",
    price: "$70",
    position: { lat: 37.78, lng: -122.415 },
    avatar: faker.image.avatar(),
  },
  {
    name: "Business 3",
    price: "$90",
    position: { lat: 37.77, lng: -122.41 },
    avatar: faker.image.avatar(),
  },
];

function OverLayWrapper({
  business,
  getPixelPositionOffset,
  index,
}: {
  business: Business;
  getPixelPositionOffset: (
    width: number,
    height: number,
  ) => {
    x: number;
    y: number;
  };
  index: number;
}) {
  const [isHovered, setIsHovered] = useState(false);
  return (
    <OverlayView
      key={index}
      position={business.position}
      mapPaneName={OverlayView.OVERLAY_MOUSE_TARGET}
      getPixelPositionOffset={getPixelPositionOffset}
    >
      <div
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        className="relative cursor-pointer "
        onClick={() => console.log(business)}
      >
        {isHovered && (
          <div className="flex-center absolute right-5 flex w-[180px] gap-2  rounded-lg border-2 border-primary bg-white p-2">
            <Image
              src={business.avatar}
              alt="Avatar"
              className="rounded-full"
              height={50}
              width={50}
            />
            <div className="  text-lg">{business.name}</div>
          </div>
        )}

        {/* {isHovered && (
        )} */}
        <div className="flex-center size-16 rounded-full border-2 border-primary bg-orange-400 text-lg font-bold">
          {business.price}
        </div>
      </div>
    </OverlayView>
  );
}

export function GoogleMapAPIMap() {
  const { isLoaded } = useJsApiLoader({
    id: "google-map-script",
    googleMapsApiKey: env.NEXT_PUBLIC_GOOGLE_API_KEY,
    // mapIds: ["d83a896cebe69e1c"],
  });

  const getPixelPositionOffset = (width: number, height: number) => ({
    x: -(width / 2),
    y: -(height / 2),
  });

  return isLoaded ? (
    <GoogleMap
      mapContainerStyle={{ width: "100%", height: "400px" }}
      zoom={mapOptions.zoom}
      center={mapOptions.center}
      mapTypeId="roadmap"
      options={{
        streetViewControl: false,
        mapTypeControl: false,
        fullscreenControl: false,
        zoomControl: false,
        styles: silver,
      }}
    >
      {businesses.map((business, index) => (
        <OverLayWrapper
          key={index}
          business={business}
          getPixelPositionOffset={getPixelPositionOffset}
          index={index}
        />
      ))}
    </GoogleMap>
  ) : (
    <></>
  );
}
