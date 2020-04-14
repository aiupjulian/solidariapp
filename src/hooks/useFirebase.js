import { useEffect, useState } from "react";
import { useLoadingSet } from "../contexts/LoadingContext";
import firebase from "../utils/firebase";

export function useFirebase(collection, doc) {
  const [data, setData] = useState();
  const setIsLoading = useLoadingSet();
  useEffect(() => {
    setIsLoading(true);
    firebase
      .firestore()
      .collection(collection)
      .doc(doc)
      .get()
      .then(doc => {
        if (doc.exists) {
          setData(doc.data());
          setIsLoading(false);
        }
      });
  }, [collection, doc, setIsLoading]);
  return data;
}
