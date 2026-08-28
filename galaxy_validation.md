# Galaxy Interaction Validation

The arrival action transitions from the live World Signal hero into the galactic map. The map exposes fourteen worlds, eight relationship paths, panning, zoom controls, recentering, constellation mode, contrast mode, current missions, and a standard accessible list view.

World selection opens a compact inspector with an entry path to its related experience. Search correctly filters the universe by metadata and keyword. Global MAP, WORLDS, SEARCH, and ABOUT controls are intentionally mutually exclusive so a search or utility overlay does not compete with a world inspector.

The standard **ALL WORLDS** list exposes every celestial object as a semantic destination link with its ordinal, type, and status, providing the required non-spatial alternative to map exploration.

Semantic world views now return to `?galaxy=1`, preserving the entered galaxy state. Selecting a world in the map presents a dedicated **EXPLORE WORLD** action that initiates the spatial departure treatment before navigating into the selected world.

Touch-style interaction validation confirmed that a drag changes the galaxy field to `translate3d(34.32px, 19.76px, 0px) scale(1)`, RECENTRE restores `translate3d(0px, 0px, 0px) scale(1)`, and a two-point pinch expands the field to `scale(1.75)`. The active reduced-motion stylesheet suppresses map and planet transitions plus galaxy-star animation while leaving the controls and inspector structure available.

Explicit browser reduced-motion emulation confirmed that the galaxy star reports `animation-name: none`, the map transition is reduced to `0.001s`, the Search overlay opens normally, and a touch-style map pan remains active under this preference.
