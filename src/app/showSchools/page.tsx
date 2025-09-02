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
    <div className="min-h-screen relative overflow-hidden bg-gradient-to-br from-purple-800 via-indigo-900 to-purple-950 p-4">
      <div className="absolute inset-0 z-0 opacity-20">
        {/* Subtle pattern or texture */}
        <div className="absolute inset-0 bg-repeat bg-center" style={{ backgroundImage: 'url("data:image/svg+xml,%3Csvg width="60" height="60" viewBox="0 0 60 60" xmlns="http://www.w3.org/2000/svg"%3E%3Cg fill="none" fill-rule="evenodd"%3E%3Cg fill="%239d174f" fill-opacity="0.1"%3E%3Cpath d="M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0 0v4h2v-4h4v-2h-4v-4h-2v4zM12 14v-4H10v4H6v2h4v4h2v-4h4v-2h-4zm0 0v4H14v-4h4v-2h-4v-4h-2v4z"/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")' }}></div>
      </div>
      <div className="relative z-10 max-w-7xl mx-auto py-8">
        <h1 className="text-4xl font-extrabold text-white mb-8 text-center">Our Schools</h1>

        {schools.length === 0 ? (
          <p className="text-center text-purple-200 text-lg">No schools found. Please add some schools first!</p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {schools.map((school) => (
              <div key={school.id} className="bg-white rounded-lg shadow-md overflow-hidden transform transition-all duration-300 hover:scale-105 hover:shadow-xl">
                <div className="relative w-full h-48 bg-purple-200">
                  {school.image ? (
                    <Image
                      src={school.image}
                      alt={school.name}
                      layout="fill"
                      objectFit="cover"
                      className="rounded-t-lg"
                    />
                  ) : (
                    <div className="flex items-center justify-center w-full h-full text-purple-500 text-sm">
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
