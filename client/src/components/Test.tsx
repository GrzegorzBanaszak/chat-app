import React,{useState,useEffect} from 'react'
import {storage} from "./firebaseConfig"
import { getDownloadURL, ref } from 'firebase/storage';

const Test = () => {
    const [image,setImage] = useState("");

    useEffect(() =>{
        const imageRef = ref(storage,"happy.jpg")
        getDownloadURL(imageRef).then(url =>(setImage(url)))
    },[])
  return (
    <div>
        {image !== "" && <img src={image} alt="test"/>}
    </div>
  )
}

export default Test