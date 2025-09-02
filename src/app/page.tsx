'use client';

import Link from 'next/link';
import React from 'react';

export default function HomePage() {
  return (
    <div className="min-h-screen relative overflow-hidden bg-gradient-to-br from-purple-800 via-indigo-900 to-purple-950 flex flex-col items-center justify-center p-4">
      <div className="absolute inset-0 z-0 opacity-20">
        {/* Subtle pattern or texture */}
        <div className="absolute inset-0 bg-repeat bg-center" style={{ backgroundImage: 'url("data:image/svg+xml,%3Csvg width="60" height="60" viewBox="0 0 60 60" xmlns="http://www.w3.org/2000/svg"%3E%3Cg fill="none" fill-rule="evenodd"%3E%3Cg fill="%239d174f" fill-opacity="0.1"%3E%3Cpath d="M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0 0v4h2v-4h4v-2h-4v-4h-2v4zM12 14v-4H10v4H6v2h4v4h2v-4h4v-2h-4zm0 0v4H14v-4h4v-2h-4v-4h-2v4z"/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")' }}></div>
      </div>
      <div className="relative z-10 bg-white p-10 rounded-xl shadow-2xl text-center max-w-2xl w-full transform transition-all duration-500 ease-in-out scale-100 hover:scale-105">
        <h1 className="text-5xl font-extrabold text-gray-800 mb-6 leading-tight">Welcome to the School Management App</h1>
        <p className="text-lg text-gray-600 mb-8">
          Effortlessly manage your school data, from adding new institutions to viewing existing ones.
        </p>
        <div className="flex flex-col sm:flex-row justify-center gap-4">
          <Link href="/addSchool" className="inline-block bg-purple-600 hover:bg-purple-700 text-white font-bold py-3 px-8 rounded-lg shadow-md transition-colors duration-300 transform hover:-translate-y-1">
              Add New School
          </Link>
          <Link href="/showSchools" className="inline-block bg-purple-500 hover:bg-purple-600 text-white font-bold py-3 px-8 rounded-lg shadow-md transition-colors duration-300 transform hover:-translate-y-1">
              View All Schools
          </Link>
        </div>
      </div>
    </div>
  );
}
