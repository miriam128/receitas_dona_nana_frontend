import React from 'react';
import Header from './Header';

export default function AuthenticatedLayout({children}) {

  return (
    <>
      <Header />
      <div>
        {children}
      </div>
    </>

  )
}