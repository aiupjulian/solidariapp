import { useEffect, useState } from "react";
import { useLoadingSet } from "../contexts/LoadingContext";
import firebase from "../utils/firebase";

const getData = (collection, doc) => {
  const firebasePromise = firebase.firestore().collection(collection);
  return doc ? firebasePromise.doc(doc).get() : firebasePromise.get();
};

export function useFirebase(collection, doc) {
  const [data, setData] = useState();
  const setIsLoading = useLoadingSet();
  useEffect(() => {
    setIsLoading(true);
    getData(collection, doc).then(data => {
      if (doc) {
        if (data.exists) {
          setData(data.data());
        }
      } else {
        setData(data.docs.map(dataItem => dataItem.data()));
      }
      setIsLoading(false);
    });
  }, [collection, doc, setIsLoading]);
  return data;
}
