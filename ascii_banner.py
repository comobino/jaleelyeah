#!/usr/bin/env python3
"""
ascii_banner.py

Prints a colorful ASCII banner to the terminal. Useful for CLI tool
startup screens, README previews, or just for fun in a repo.

Usage:
    python ascii_banner.py "Hello World"
    python ascii_banner.py "Hello World" --color cyan
"""

import argparse
import shutil
import sys

COLORS = {
    "red": "\033[91m",
    "green": "\033[92m",
    "yellow": "\033[93m",
    "blue": "\033[94m",
    "magenta": "\033[95m",
    "cyan": "\033[96m",
    "white": "\033[97m",
}
RESET = "\033[0m"

# A minimal 5-row block font for A-Z, 0-9, and space.
FONT = {
    "A": ["  #  ", " # # ", "#####", "#   #", "#   #"],
    "B": ["#### ", "#   #", "#### ", "#   #", "#### "],
    "C": [" ####", "#    ", "#    ", "#    ", " ####"],
    "D": ["#### ", "#   #", "#   #", "#   #", "#### "],
    "E": ["#####", "#    ", "#### ", "#    ", "#####"],
    "F": ["#####", "#    ", "#### ", "#    ", "#    "],
    "G": [" ####", "#    ", "# ###", "#   #", " ####"],
    "H": ["#   #", "#   #", "#####", "#   #", "#   #"],
    "I": ["#####", "  #  ", "  #  ", "  #  ", "#####"],
    "J": ["#####", "   # ", "   # ", "#  # ", " ##  "],
    "K": ["#   #", "#  # ", "###  ", "#  # ", "#   #"],
    "L": ["#    ", "#    ", "#    ", "#    ", "#####"],
    "M": ["#   #", "## ##", "# # #", "#   #", "#   #"],
    "N": ["#   #", "##  #", "# # #", "#  ##", "#   #"],
    "O": [" ### ", "#   #", "#   #", "#   #", " ### "],
    "P": ["#### ", "#   #", "#### ", "#    ", "#    "],
    "Q": [" ### ", "#   #", "#   #", "#  ##", " ####"],
    "R": ["#### ", "#   #", "#### ", "#  # ", "#   #"],
    "S": [" ####", "#    ", " ### ", "    #", "#### "],
    "T": ["#####", "  #  ", "  #  ", "  #  ", "  #  "],
    "U": ["#   #", "#   #", "#   #", "#   #", " ### "],
    "V": ["#   #", "#   #", "#   #", " # # ", "  #  "],
    "W": ["#   #", "#   #", "# # #", "## ##", "#   #"],
    "X": ["#   #", " # # ", "  #  ", " # # ", "#   #"],
    "Y": ["#   #", " # # ", "  #  ", "  #  ", "  #  "],
    "Z": ["#####", "   # ", "  #  ", " #   ", "#####"],
    "0": [" ### ", "#   #", "#   #", "#   #", " ### "],
    "1": ["  #  ", " ##  ", "  #  ", "  #  ", "#####"],
    "2": [" ### ", "#   #", "   # ", "  #  ", "#####"],
    "3": ["#### ", "    #", "  ###", "    #", "#### "],
    "4": ["#   #", "#   #", "#####", "    #", "    #"],
    "5": ["#####", "#    ", "#####", "    #", "#####"],
    "6": [" ####", "#    ", "#####", "#   #", " ### "],
    "7": ["#####", "    #", "   # ", "  #  ", "  #  "],
    "8": [" ### ", "#   #", " ### ", "#   #", " ### "],
    "9": [" ### ", "#   #", " ####", "    #", " ### "],
    " ": ["     ", "     ", "     ", "     ", "     "],
}


def render(text: str) -> list[str]:
    text = text.upper()
    rows = ["", "", "", "", ""]
    for ch in text:
        glyph = FONT.get(ch, FONT[" "])
        for i in range(5):
            rows[i] += glyph[i] + " "
    return rows


def main():
    parser = argparse.ArgumentParser(description="Print a colorful ASCII banner.")
    parser.add_argument("text", nargs="?", default="HELLO", help="Text to render")
    parser.add_argument(
        "--color",
        choices=COLORS.keys(),
        default="cyan",
        help="Banner color (default: cyan)",
    )
    parser.add_argument(
        "--border",
        action="store_true",
        help="Draw a border box around the banner",
    )
    args = parser.parse_args()

    rows = render(args.text)
    color = COLORS[args.color]
    width = max(len(r) for r in rows)

    term_width = shutil.get_terminal_size((80, 20)).columns
    if width > term_width:
        sys.stderr.write(
            "Warning: banner wider than terminal, output may wrap.\n"
        )

    print()
    if args.border:
        print(color + "+" + "-" * (width + 2) + "+" + RESET)
    for row in rows:
        line = row.ljust(width)
        if args.border:
            print(color + "| " + line + " |" + RESET)
        else:
            print(color + line + RESET)
    if args.border:
        print(color + "+" + "-" * (width + 2) + "+" + RESET)
    print()


if __name__ == "__main__":
    main()
