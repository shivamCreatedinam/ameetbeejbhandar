import React from 'react'
import { Header } from "../components/Header/Header";
import { Hero } from "../components/Hero/Hero";
import { Products } from "../components/Products/Products";
import { Footer } from "../components/Footer/Footer";
import { About } from "../components/About/About";
import { Skills } from "../components/Skills/Skills";
import { Testimonials } from "../components/Testimonials/Testimonials";

export const Home = () => {
  return (
    <>
    <Header />
      <Hero />
      <About />
      <Skills />
      <Products />
      <Testimonials />
      <Footer />
    </>
  )
}
