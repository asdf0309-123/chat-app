# Design System Overview (Brutalist Mono)

This system rejects gradients, softness, and "pretty" defaults. It uses stark black/white contrast, rigid geometry, and utilitarian typography.

## Design Direction

- Tone: Raw, industrial, unapologetically minimal
- Density: Dense and functional
- Visual weight: Heavy blocks, hard edges

## Color System

- Background: #FFFFFF
- Foreground: #000000
- Accent: #000000 (used as blocks, not decoration)
- Inverse Section: #000000 background with #FFFFFF text

Rules:
- No gradients
- No soft shadows
- Color is structural, not decorative

## Typography

- Font: "IBM Plex Mono", monospace
- Style: Mechanical, uniform

Rules:
- No decorative typography
- Same font for everything
- Use weight changes instead of size when possible

Scale:
- H1: 40px
- H2: 28px
- H3: 20px
- Body: 16px
- Small: 13px

## Layout

- Max width: none (full-width)
- Grid: Strict blocks
- Sections: Hard separated bands
- Spacing scale: 8, 16, 24, 32

Patterns:
- Full-width strips
- Boxed content inside thick borders

## Components

### Buttons
- Style: Black rectangle, white text
- Radius: 0px
- Border: 2px solid black
- Hover: invert colors
- Active: no animation

### Cards
- Background: white
- Border: 2px solid black
- Padding: 16px
- Shadow: none

### Inputs
- Background: white
- Border: 2px solid black
- Focus: thicker border (3px)

## Interaction

- No animations by default
- Hover: only color inversion
- No easing, no motion

## Accessibility

- Maintain strong contrast despite neon usage
- Avoid pure neon text on dark for long reading
- Always provide visible focus outlines

## Responsive

- Mobile: simplify asymmetry into stacked layout
- Tablet: partial offsets
- Desktop: full expressive layout

## Notes

- If it looks "nice", it's wrong
- Prefer harsh over smooth
- Function over decoration
