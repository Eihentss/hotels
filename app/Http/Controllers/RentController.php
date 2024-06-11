<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Rent;

class RentController extends Controller
{
    public function store(Request $request)
    {
        // Validācija datiem
        $validatedData = $request->validate([
            'apartment_id' => 'required|exists:apartments,id',
            'user_id' => 'required|exists:users,id',
            'start_date' => 'required|date',
            'end_date' => 'required|date|after:start_date',
            'review' => 'nullable|string',
            'rating' => 'nullable|integer|min:1|max:5',
        ]);

        // Saglabājam izīrēšanas datus
        $rent = Rent::create($validatedData);

        return response()->json(['message' => 'Izīrēšanas dati saglabāti veiksmīgi!'], 200);
    }
}
