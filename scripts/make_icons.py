"""Render logo PNGs from the N-monogram geometry (see public/logo.svg).

Geometry (viewBox 0 0 256 256): two stems x 32..72 and x 184..224, y 31..225;
diagonal band (72,31) -> (184,161) -> (184,225) -> (72,95).

Usage: python scripts/make_icons.py  (needs Pillow)
"""

from PIL import Image, ImageDraw

INK = (26, 25, 23, 255)
PAPER = (250, 249, 247, 255)
PAPER_HEX = '#FAF9F7'
REVERSED = (237, 233, 225, 255)
TILE = (26, 25, 23, 255)

VIEW = (0, 0, 256, 256)  # x, y, w, h
STEM_L = (32, 31, 72, 225)  # x0, y0, x1, y1
STEM_R = (184, 31, 224, 225)
DIAG = [(72, 31), (184, 161), (184, 225), (72, 95)]
TILE_MARK_SCALE = 0.818  # mark box / tile size (matches the exported app icon)


def draw_mark(draw: ImageDraw.ImageDraw, u: float, color: tuple, ox: float, oy: float) -> None:
    for x0, y0, x1, y1 in (STEM_L, STEM_R):
        draw.rectangle(
            [(ox + x0 * u, oy + y0 * u), (ox + x1 * u - 1, oy + y1 * u - 1)],
            fill=color,
        )
    draw.polygon([(ox + x * u, oy + y * u) for x, y in DIAG], fill=color)


def render_mark(size: int, color: tuple, bg: tuple | None = None) -> Image.Image:
    img = Image.new('RGBA', (size, size), bg or (0, 0, 0, 0))
    draw_mark(ImageDraw.Draw(img), size / VIEW[2], color, 0, 0)
    return img


def render_tile(size: int, fg: tuple, bg: tuple, radius_ratio: float = 0.225) -> Image.Image:
    img = Image.new('RGBA', (size, size), (0, 0, 0, 0))
    draw = ImageDraw.Draw(img)
    draw.rounded_rectangle(
        [(0, 0), (size - 1, size - 1)], radius=round(size * radius_ratio), fill=bg
    )
    box = TILE_MARK_SCALE * size
    off = (size - box) / 2
    draw_mark(draw, box / VIEW[2], fg, off, off)
    return img


if __name__ == '__main__':
    from PIL import ImageFont

    render_tile(32, REVERSED, TILE).save('public/favicon-32.png')
    render_tile(192, REVERSED, TILE).save('public/icon-192.png')
    render_tile(512, REVERSED, TILE).save('public/icon-512.png')
    render_mark(180, REVERSED, TILE).save('public/apple-touch-icon.png')
    render_mark(180, REVERSED, TILE).save('public/apple-touch-icon-micro.png')

    # OG card 1200x630: mark on top, name + role below (Arial or fallback).
    W, H = 1200, 630
    og = Image.new('RGBA', (W, H), PAPER)
    draw = ImageDraw.Draw(og)
    box = 300
    u = box / VIEW[2]
    ox, oy = (W - box) / 2, 150
    draw_mark(draw, u, INK, ox, oy)

    try:
        name_f = ImageFont.truetype('C:/Windows/Fonts/arialbd.ttf', 64)
        role_f = ImageFont.truetype('C:/Windows/Fonts/arial.ttf', 28)
    except OSError:
        name_f = role_f = ImageFont.load_default()
    name, role = 'Muhammad Naufal Aulia', 'WEB DEVELOPMENT & DIGITAL CONTENT'
    nb = draw.textbbox((0, 0), name, font=name_f)
    draw.text(((W - (nb[2] - nb[0])) / 2, 470), name, font=name_f, fill=INK)
    rb = draw.textbbox((0, 0), role, font=role_f)
    draw.text(((W - (rb[2] - rb[0])) / 2, 545), role, font=role_f, fill=(111, 108, 102, 255))
    og.convert('RGB').save('public/og-image.png')
    print('icons written to public/')
