import React,{useState,useEffect} from 'react'
import {storage} from "./firebaseConfig"
import { getDownloadURL, ref } from 'firebase/storage';

const Test = () => {
    const [image,setImage] = useState("");

    useEffect(() =>{
        const imageRef = ref(storage,"boomer.png")
        getDownloadURL(imageRef).then(url =>console.log(url))
    },[])
  return (
    <div>
        {image !== "" && <img src={image} alt="test"/>}
    </div>
  )
}

export default Test
