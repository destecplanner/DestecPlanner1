<?php

namespace App\Modules\Admin\Controllers;

use App\Http\Controllers\Controller;
use App\Modules\Reviews\Models\Review;
use Illuminate\Http\Request;

class ReviewModerationController extends Controller
{
    /**
     * List reviews platform-wide.
     */
    public function index(Request $request)
    {
        $query = Review::withoutGlobalScope(\App\Scopes\TenantScope::class)
            ->with(['customer:id,name', 'appointment.service:id,name', 'business:id,name']);

        if ($request->has('business_id')) {
            $query->where('business_id', $request->business_id);
        }

        if ($request->has('is_published')) {
            $query->where('is_published', $request->is_published === 'true');
        }

        return response()->json([
            'status' => 'success',
            'data' => $query->paginate(20)
        ]);
    }

    /**
     * Moderate a review (Publish/Hide).
     */
    public function update(Request $request, $id)
    {
        $review = Review::withoutGlobalScope(\App\Scopes\TenantScope::class)->findOrFail($id);

        $validated = $request->validate([
            'is_published' => 'required|boolean',
            'comment' => 'sometimes|string',
        ]);

        $review->update($validated);

        return response()->json([
            'status' => 'success',
            'message' => 'Review moderation status updated.',
            'data' => $review
        ]);
    }

    /**
     * Delete an inappropriate review.
     */
    public function destroy($id)
    {
        $review = Review::withoutGlobalScope(\App\Scopes\TenantScope::class)->findOrFail($id);
        $review->delete();

        return response()->json([
            'status' => 'success',
            'message' => 'Review deleted.'
        ]);
    }
}
