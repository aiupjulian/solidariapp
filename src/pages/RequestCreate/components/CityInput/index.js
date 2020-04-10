import React, { useEffect, useRef, useState } from "react";
import { Form } from "react-bulma-components";
import places from "places.js";

const { Field, Label, Control, Input } = Form;

const TitleInput = () => {
  const [city, setCity] = useState("");
  const cityInputElement = useRef(null);
  useEffect(() => {
    const placesAutocomplete = places({
      appId: "plN14EG00UY5",
      apiKey: "545521c135e551ef2d973e5a991311b1",
      container: cityInputElement.current,
      type: "city",
      language: "es",
      countries: ["AR"],
    });
    placesAutocomplete.on("change", (e) => setCity(e.suggestion.value));
  }, []);
  return (
    <Field>
      <Label>Ciudad</Label>
      <Control>
        <Input
          name="city"
          onChange={(e) => setCity(e.currentTarget.value)}
          value={city}
          domRef={cityInputElement}
        />
      </Control>
    </Field>
  );
};

export default TitleInput;
