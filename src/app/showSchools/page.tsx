'use client';

import React from 'react';
import Image from 'next/image';

interface School {
  id: number;
  name: string;
  address: string;
  city: string;
  image: string | null;
}

async function getSchools(): Promise<School[]> {
  const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/schools`, { cache: 'no-store' });
  if (!res.ok) {
    // This will activate the closest `error.js` Error Boundary
    throw new Error('Failed to fetch data');
  }
  return res.json();
}

const ShowSchoolsPage = async () => {
  const schools = await getSchools();

  return (
    <div className="min-h-screen bg-gray-100 p-4">
      <div className="max-w-7xl mx-auto py-8">
        <h1 className="text-4xl font-extrabold text-gray-900 mb-8 text-center">Our Schools</h1>

        {schools.length === 0 ? (
          <p className="text-center text-gray-600 text-lg">No schools found. Please add some schools first!</p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {schools.map((school) => (
              <div key={school.id} className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300">
                <div className="relative w-full h-48 bg-gray-200">
                  {school.image ? (
                    <Image
                      src={school.image}
                      alt={school.name}
                      layout="fill"
                      objectFit="cover"
                      className="rounded-t-lg"
                    />
                  ) : (
                    <div className="flex items-center justify-center w-full h-full text-gray-500 text-sm">
                      No Image Available
                    </div>
                  )}
                </div>
                <div className="p-4">
                  <h2 className="text-xl font-semibold text-gray-800 mb-1 truncate">{school.name}</h2>
                  <p className="text-gray-600 text-sm mb-1 truncate">{school.address}</p>
                  <p className="text-gray-500 text-xs">{school.city}</p>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default ShowSchoolsPage;
