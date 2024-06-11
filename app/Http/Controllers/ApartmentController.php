<?php
namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Inertia\Inertia;
use App\Models\Apartment;

class ApartmentController extends Controller
{
    public function index(Request $request)
    {
        $query = Apartment::query();

        if ($request->filled('search')) {
            $query->where('name', 'like', '%' . $request->search . '%')
                  ->orWhere('description', 'like', '%' . $request->search . '%');
        }

        if ($request->filled('sort')) {
            $query->orderBy($request->sort, $request->order ?? 'asc');
        }

        $apartments = $query->with('reviews')->paginate(10);

        return Inertia::render('Apartments/Index', [
            'apartments' => $apartments,
        ]);
    }


    public function store(Request $request)
    {
        $request->validate([
            'name' => 'required|string|max:255',
            'description' => 'required',
            'price' => 'required|numeric|gt:0',
            'image' => 'required|image|mimes:jpeg,png,jpg,gif,svg|max:2048',
            'bedroom' => 'required|boolean',
            'bathroom' => 'required|boolean',
            'kitchen' => 'required|boolean',
            'tv' => 'required|boolean',
            'address' => 'required',
        ]);

        if ($request->hasFile('image')) {
            $file = $request->file('image');
            $filename = $file->getClientOriginalName();
            $file->storeAs('/public/image/',  $filename);
        }

        $bedroom = $request->boolean('bedroom');
        $bathroom = $request->boolean('bathroom');
        $kitchen = $request->boolean('kitchen');
        $tv = $request->boolean('tv');

        $apartment = new Apartment();
        $apartment->name = $request->name;
        $apartment->address = $request->address;
        $apartment->description = $request->description;
        $apartment->price = $request->price;
        $apartment->image = $filename;
        $apartment->bedroom = $bedroom;
        $apartment->bathroom = $bathroom;
        $apartment->kitchen = $kitchen;
        $apartment->tv = $tv;
        $apartment->save();

        return redirect()->route('apartments.index');
    }


    public function create()
    {
        return Inertia::render('Apartments/Create');
    }

    public function show($id)
    {
        $apartment = Apartment::with('reviews')->findOrFail($id);
        return Inertia::render('Apartments/Show', [
            'apartment' => $apartment,
        ]);
    }

    public function destroy($id)
    {
        $apartment = Apartment::findOrFail($id);
        $apartment->delete();

        return response()->json(['message' => 'Apartment deleted successfully'], 200);
    }
}
