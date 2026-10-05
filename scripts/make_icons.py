"""Render logo PNGs from the exact 5x5-grid geometry (see public/logo.svg).

Grid coords: 0..100, cell 20. Square: x 40..80, y 40..80.
Extended line: (-20, 60) -> (40, 60). Clearspace viewBox: -40..140.
Micro (favicon): square only, viewBox 20..100.

Usage: python scripts/make_icons.py  (needs Pillow)
"""

from PIL import Image, ImageDraw

INK = (26, 25, 23, 255)
PAPER = (250, 249, 247, 255)

GRID_LINES = [0, 20, 40, 60, 80, 100]
SQ = (40, 40, 80, 80)  # x0, y0, x1, y1
EXT_LINE = ((-20, 60), (40, 60))
VIEW = (-40, -40, 180, 180)  # x, y, w, h (incl. clearspace)
MICRO_VIEW = (20, 20, 80, 80)


def draw_mark(draw: ImageDraw.ImageDraw, u: float, color: tuple, grid: bool) -> None:
    ox, oy = -VIEW[0] * u, -VIEW[1] * u

    def px(gx: float) -> float:
        return ox + gx * u

    def py(gy: float) -> float:
        return oy + gy * u

    if grid:
        gw = max(1, round(1.5 * u))
        for g in GRID_LINES:
            draw.line([(px(0), py(g)), (px(100), py(g))], fill=color, width=gw)
            draw.line([(px(g), py(0)), (px(g), py(100))], fill=color, width=gw)
        (x0, y0), (x1, y1) = EXT_LINE
        draw.line([(px(x0), py(y0)), (px(x1), py(y1))], fill=color, width=round(4 * u))
    draw.rectangle(
        [(px(SQ[0]), py(SQ[1])), (px(SQ[2]) - 1, py(SQ[3]) - 1)], fill=color
    )


def render(size: int, color: tuple, grid: bool, bg: tuple | None) -> Image.Image:
    u = size / VIEW[2]
    img = Image.new('RGBA', (size, size), bg or (0, 0, 0, 0))
    draw_mark(ImageDraw.Draw(img), u, color, grid)
    return img


def render_micro(size: int, color: tuple) -> Image.Image:
    u = size / MICRO_VIEW[2]
    img = Image.new('RGBA', (size, size), (0, 0, 0, 0))
    d = ImageDraw.Draw(img)
    ox, oy = -MICRO_VIEW[0] * u, -MICRO_VIEW[1] * u
    d.rectangle(
        [(ox + SQ[0] * u, oy + SQ[1] * u), (ox + SQ[2] * u - 1, oy + SQ[3] * u - 1)],
        fill=color,
    )
    return img


if __name__ == '__main__':
    render_micro(32, INK).save('public/favicon-32.png')
    render(180, INK, grid=True, bg=PAPER).save('public/apple-touch-icon.png')
    render(192, INK, grid=True, bg=None).save('public/icon-192.png')
    render(512, INK, grid=True, bg=None).save('public/icon-512.png')
    render_micro(180, INK).save('public/apple-touch-icon-micro.png')
    print('icons written to public/')
