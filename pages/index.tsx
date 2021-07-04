import Head from 'next/head'
import Image from 'next/image'
import styles from '../styles/Home.module.css'
import React, { useState } from 'react';

export default function Home() {
  const [text, setText] = useState("test");
  
  setTimeout(() => {
    setText("init")
  }, 1000)
  
  return (
    <>
    <h2>{text}</h2>
    </>
  )
}
