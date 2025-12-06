#!/usr/bin/env python3
"""guess_number.py - simple number guessing game

Usage:
  python guess_number.py [--min MIN] [--max MAX]

The computer selects a random integer between MIN and MAX (inclusive) and the player
tries to guess it. After each guess the program tells the player whether the guess
is too low, too high, or correct. The program counts attempts and supports typing
'quit' or 'exit' to end early.
"""

import argparse
import random
import sys


def parse_args():
    parser = argparse.ArgumentParser(description="Play a number guessing game.")
    parser.add_argument("--min", type=int, default=1, help="Minimum number (inclusive)")
    parser.add_argument("--max", type=int, default=100, help="Maximum number (inclusive)")
    return parser.parse_args()


def main():
    args = parse_args()
    low, high = args.min, args.max
    if low > high:
        print(f"Error: --min ({low}) must be <= --max ({high}).")
        sys.exit(2)

    secret = random.randint(low, high)
    attempts = 0

    print("I'm thinking of a number between {} and {}.".format(low, high))
    print("Type 'quit' or 'exit' to give up.")

    while True:
        attempts += 1
        try:
            reply = input(f"Guess #{attempts}: ")
        except (EOFError, KeyboardInterrupt):
            print("\nGoodbye!")
            sys.exit(0)

        text = reply.strip().lower()
        if text in ("quit", "exit"):
            print(f"You gave up after {attempts-1} attempts. The number was {secret}.")
            break

        if not text:
            print("Please enter a number or 'quit'.")
            attempts -= 1
            continue

        if not (text.lstrip("+-").isdigit()):
            print("Please enter a valid integer.")
            attempts -= 1
            continue

        try:
            guess = int(text)
        except ValueError:
            print("Please enter a valid integer.")
            attempts -= 1
            continue

        if guess < low or guess > high:
            print(f"Out of range: enter a number between {low} and {high}.")
            continue

        if guess < secret:
            print("Too low.")
        elif guess > secret:
            print("Too high.")
        else:
            print(f"Correct! You guessed the number {secret} in {attempts} attempts.")
            break


if __name__ == "__main__":
    main()
