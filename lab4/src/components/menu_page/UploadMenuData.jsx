import { useEffect } from "react";
import { db } from "../../firebase";
import { collection, setDoc, doc } from "firebase/firestore";
import menuData from "./menuData";

const UploadMenuData = () => {
  useEffect(() => {
    const upload = async () => {
      try {
        for (const section of menuData) {
          const sectionTitle = section.title;

          for (const item of section.items) {
            const id = `${sectionTitle}-${item.name}`
              .replace(/[^\w\s]/gi, "")
              .replace(/\s+/g, "-")
              .toLowerCase();

            await setDoc(doc(db, "menu", id), {
              name: item.name,
              image: item.image,
              alt: item.alt,
              description: item.description,
              ingredients: item.ingredients,
              price: item.price,
              section: sectionTitle,
            });
          }
        }
        console.log("Menu uploaded to Firestore");
      } catch (error) {
        console.error("rror uploading menu:", error);
      }
    };

    upload();
  }, []);

  return <p>Завантаження меню до Firestore... Перевір консоль.</p>;
};

export default UploadMenuData;
