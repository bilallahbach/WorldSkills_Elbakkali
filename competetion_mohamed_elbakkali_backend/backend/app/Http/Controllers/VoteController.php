<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use App\Models\Vote;
use App\Models\Anecdote;
use Illuminate\Http\Request;

class VoteController extends Controller
{
    public function __construct()
    {
        $this->middleware('auth:sanctum');
    }

    public function vote(Request $request, $anecdoteId)
    {
        $attrs = $request->validate([
            'type' => 'required|in:Bof,Excellent,Technique,Wow',
        ]);

        $user = $request->user();

        // Check anecdote exists
        $anecdote = Anecdote::findOrFail($anecdoteId);

        // Prevent duplicate votes of same type by same user on same anecdote
        $vote = Vote::where([
            ['user_id', $user->id],
            ['anecdote_id', $anecdoteId],
            ['type', $attrs['type']],
        ])->first();

        if ($vote) {
            return response()->json(['message' => 'You already voted this type for this anecdote.'], 409);
        }

        $vote = Vote::create([
            'user_id' => $user->id,
            'anecdote_id' => $anecdoteId,
            'type' => $attrs['type'],
        ]);

        return response()->json(['message' => 'Vote registered.'], 201);
    }
}
