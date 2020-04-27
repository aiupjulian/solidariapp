import React, { useEffect, useRef, useState } from "react";
import { Form } from "react-bulma-components";
import places from "places.js";
import { useFormContext } from "react-hook-form";

const { Input } = Form;

const CityInput = (props) => {
  const {
    setValue,
    register,
    unregister,
    triggerValidation,
    formState: { isSubmitted },
  } = useFormContext();
  const [city, setCity] = useState("");
  const cityInputElement = useRef(null);
  const placesAutocomplete = useRef(null);
  useEffect(() => {
    register({ name: "city" });
    placesAutocomplete.current = places({
      appId: "plN14EG00UY5",
      apiKey: "545521c135e551ef2d973e5a991311b1",
      container: cityInputElement.current,
      type: "city",
      language: "es",
      countries: ["AR"],
    });
    return () => unregister("city");
  }, []);
  useEffect(() => {
    placesAutocomplete.current.on("change", (e) => {
      setValue("city", e.suggestion.value, isSubmitted);
      setCity(e.suggestion.value);
    });
    placesAutocomplete.current.on("clear", (e) => {
      setValue("city", "", isSubmitted);
      setCity("");
    });
    return () => {
      placesAutocomplete.current.removeAllListeners("change");
      placesAutocomplete.current.removeAllListeners("clear");
    };
  }, [setValue, isSubmitted]);
  return (
    <Input
      onChange={(e) => {
        setCity(e.target.value);
        setValue("city", "", isSubmitted);
      }}
      onFocus={() => {
        placesAutocomplete.current.open();
      }}
      onBlur={() => {
        placesAutocomplete.current.close();
        if (isSubmitted) triggerValidation("city");
      }}
      value={city}
      domRef={cityInputElement}
      {...props}
    />
  );
};

export default CityInput;
