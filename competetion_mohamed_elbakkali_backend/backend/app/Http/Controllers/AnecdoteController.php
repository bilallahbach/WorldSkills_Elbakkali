<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use App\Models\Anecdote;
use Illuminate\Http\Request;

class AnecdoteController extends Controller
{
    public function __construct()
    {
        $this->middleware('auth:sanctum')->only(['store', 'destroy']);
    }

    public function index(Request $request)
    {
        $query = Anecdote::with(['user', 'votes']);

        // Optional filters:
        if ($request->category) {
            $query->where('category', $request->category);
        }

        if ($request->sort) {
            if ($request->sort === 'wow') {
                $query->withCount(['votes as wow_count' => function ($q) {
                    $q->where('type', 'Wow');
                }])->orderByDesc('wow_count');
            } elseif ($request->sort === 'technique') {
                $query->withCount(['votes as tech_count' => function ($q) {
                    $q->where('type', 'Technique');
                }])->orderByDesc('tech_count');
            } elseif ($request->sort === 'week') {
                $query->whereHas('votes', function ($q) {
                    $q->where('type', 'Wow')
                      ->where('created_at', '>=', now()->subWeek());
                });
            }
        } else {
            $query->latest();
        }

        return $query->paginate(10);
    }

    public function store(Request $request)
    {
        $attrs = $request->validate([
            'title' => 'nullable|string|max:255',
            'content' => 'required|string|max:1000',
            'category' => 'required|in:Histoire,Humour,Vie quotidienne,Échec,Succès',
        ]);

        $attrs['user_id'] = $request->user()->id;

        $anecdote = Anecdote::create($attrs);

        return response()->json($anecdote, 201);
    }

    public function destroy($id, Request $request)
    {
        $anecdote = Anecdote::findOrFail($id);

        if ($request->user()->role !== 'admin') {
            return response()->json(['message' => 'Forbidden'], 403);
        }

        $anecdote->delete();

        return response()->json(['message' => 'Deleted successfully.']);
    }
}
