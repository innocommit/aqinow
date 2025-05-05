from datetime import datetime, timezone, timedelta


def to_camel(string: str) -> str:
    parts = string.split('_')
    return parts[0].lower() + ''.join(word.capitalize() for word in parts[1:])


def to_vietnam_timezone_str(dt: datetime) -> str:
    if dt.tzinfo is None:
        dt = dt.replace(tzinfo=timezone.utc)
    ict_dt = dt.astimezone(timezone(timedelta(hours=7)))
    return ict_dt.strftime("%d/%m/%Y %H:%M")
