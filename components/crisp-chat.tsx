"use client"

import { Crisp } from "crisp-sdk-web"

import { useEffect } from 'react'

export const CrispChat = () => {
  useEffect(() => {
    Crisp.configure("a65d1871-1bea-4987-b3b4-3ea4033032d3");
  }, []);

  return null;
}
