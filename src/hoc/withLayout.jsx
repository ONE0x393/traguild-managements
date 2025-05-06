import React from 'react';
import Sidebar from '../components/Sidebar';
import Header from '../components/Header';

export default function withLayout(Page) {
  return function Layout(props) {
    return (
      <div className="flex min-h-screen">
        <Sidebar />
        <div className="flex-1 flex flex-col">
        <Header />
          <main className="flex-1 p-6">
            <Page {...props} />
          </main>
          {/* <footer className="border-t border-default-border p-4 text-sm text-gray-600 text-center bg-home-bg">
            © 2025
          </footer> */}
        </div>
      </div>
    );
  };
}
