'use client';

import { useEffect } from 'react';

export default function ReservierungenPage() {
  useEffect(() => {
    async function test() {
      console.log('PAGE LOADED');

      const auth = localStorage.getItem('auth');

      console.log('AUTH:', auth);

      if (!auth) {
        console.log('NO AUTH');
        return;
      }

      const parsed = JSON.parse(auth);

      console.log('TOKEN:', parsed.token);

      const res = await fetch('/api/reservations', {
        headers: {
          Authorization: `Bearer ${parsed.token}`,
        },
      });

      const data = await res.json();

      console.log('RESERVATIONS RESPONSE:', data);
    }

    test();
  }, []);

  return (
    <div className="min-h-screen bg-black text-white p-10">
      <h1 className="text-4xl font-bold text-yellow-500">
        TEST RESERVATIONS PAGE
      </h1>
    </div>
  );
}