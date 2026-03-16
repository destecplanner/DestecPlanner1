<?php

namespace App\Modules\Bookings\Enums;

enum AppointmentStatus: string
{
    case PENDING = 'pending';
    case CONFIRMED = 'confirmed';
    case COMPLETED = 'completed';
    case CANCELED = 'canceled';
    case NO_SHOW = 'no_show';

    public function canTransitionTo(self $target): bool
    {
        return match ($this) {
            self::PENDING => in_array($target, [self::CONFIRMED, self::CANCELED]),
            self::CONFIRMED => in_array($target, [self::COMPLETED, self::CANCELED, self::NO_SHOW]),
            self::COMPLETED, self::CANCELED, self::NO_SHOW => false, // Terminal states
        };
    }
}
