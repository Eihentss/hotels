<?php

namespace App\Http\Controllers;

use App\Models\Review;
use Illuminate\Http\Request;
use Inertia\Inertia;

class ReviewController extends Controller
{
    public function index()
    {
        $reviews = Review::with('apartment', 'user')->get();
        return Inertia::render('Reviews/Index', compact('reviews'));
    }

    public function create()
    {
        return Inertia::render('Reviews/Create');
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'apartment_id' => 'required|exists:apartments,id',
            'user_id' => 'required|exists:users,id',
            'review' => 'required|string',
            'rating' => 'required|integer|min:1|max:5',
        ]);

        Review::create($validated);

        return redirect()->route('reviews.index');
    }

    public function show(Review $review)
    {
        return Inertia::render('Reviews/Show', compact('review'));
    }

    public function edit(Review $review)
    {
        return Inertia::render('Reviews/Edit', compact('review'));
    }

    public function update(Request $request, Review $review)
    {
        $validated = $request->validate([
            'review' => 'required|string',
            'rating' => 'required|integer|min:1|max:5',
        ]);

        $review->update($validated);

        return redirect()->route('reviews.index');
    }

    public function destroy(Review $review)
    {
        $review->delete();

        return redirect()->route('reviews.index');
    }
}
