<?php

namespace App\Http\Controllers;

use App\Models\Reservation;
use Illuminate\Http\Request;
use Inertia\Inertia;

class ReservationController extends Controller
{
    public function index()
    {
        $reservations = Reservation::all();
        return Inertia::render('Reservations/Index', ['reservations' => $reservations]);
    }

    public function create()
    {
        return Inertia::render('Reservations/Create');
    }

    public function store(Request $request)
    {
        $request->validate([
            'apartment_id' => 'required',
            'user_id' => 'required',
            'start_date' => 'required|date',
            'end_date' => 'required|date',
        ]);

        if ($request->start_date > $request->end_date) {
            return redirect()->back()->withErrors(['end_date' => 'End date must be after start date.']);
        }

        if ($request->end_date < now()) {
            return redirect()->back()->withErrors(['end_date' => 'End date must be in the future.']);
        }

        if ($request->start_date < now()) {
            return redirect()->back()->withErrors(['start_date' => 'Start date must be in the future.']);
        }

        $reservation = Reservation::where('apartment_id', $request->apartment_id);

        if ($reservation->exists()) {
            return redirect()->back()->withErrors(['apartment_id' => 'This apartment is already reserved.']);
        }

        Reservation::create($request->all());
        return redirect()->route('apartments.index');
    }

    public function show(Reservation $reservation)
    {
        return Inertia::render('Reservations/Show', compact('reservation'));
    }

    public function edit(Reservation $reservation)
    {
        return Inertia::render('Reservations/Edit', compact('reservation'));
    }

    public function accept($id)
{
    $reservation = Reservation::find($id);
    $reservation->status = 'accepted';
    $reservation->save();

    return response()->json(['message' => 'Reservation status updated to accepted']);
}

public function decline($id)
{
    $reservation = Reservation::find($id);
    $reservation->status = 'declined';
    $reservation->save();

    return response()->json(['message' => 'Reservation status updated to declined']);
}

    public function update(Request $request, Reservation $reservation)
    {
        $validated = $request->validate([
            'start_date' => 'required|date',
            'end_date' => 'required|date|after:start_date',
        ]);

        $reservation->update($validated);

        return redirect()->route('reservations.index');
    }

    public function destroy(Reservation $reservation)
    {
        $reservation->delete();

        return redirect()->route('reservations.index');
    }

    public function checkAll()
    {
        $reservations = Reservation::with(['apartment', 'user'])->get(); // Iekļauj saistītās modeļa datus
        return response()->json($reservations);
    }

    public function check(Request $request)
{
    // Veiciet pārbaudes, lai noteiktu, vai rezervācija ir pieejama
    // Piemēram, varat pārbaudīt, vai rezervācija ir brīva dotajām datumam

    // Ja rezervācija ir pieejama, sagatavojiet informāciju, ko vēlaties parādīt skatā
    $reservationInfo = [
        'start_date' => $request->start_date,
        'end_date' => $request->end_date,
        // Citi dati, ko vēlaties parādīt skatā
    ];

    // Atgrieziet skatu ar rezervācijas informāciju
    return Inertia::render('Reservations/Check', ['reservationInfo' => $reservationInfo]);
}
}
