# HungryScan Hotel Admin Panel - Design System

## Overview
The HungryScan Hotel Admin Panel features a premium, luxury hotel aesthetic with a warm and sophisticated color palette that reflects high-end hospitality.

## Color Palette

### Primary Colors
- **Gold/Amber**: `amber-500` to `amber-600` - Primary brand color for buttons and highlights
- **Dark Brown**: `amber-800` to `amber-900` - Text and headings for elegance
- **Cream**: `amber-50` to `yellow-50` - Background gradients for warmth

### Color Usage
- **Backgrounds**: `from-amber-50 via-amber-100 to-yellow-50` (gradient)
- **Primary Buttons**: `from-amber-500 to-yellow-600` (gradient)
- **Text**: `text-amber-900` (headings), `text-amber-800` (body), `text-amber-700` (secondary)
- **Borders**: `border-amber-200/50` (subtle, semi-transparent)
- **Shadows**: `shadow-amber-200/30` (warm, soft shadows)

## Typography

### Font Family
- **Primary**: Poppins (Google Fonts)
- **Weights**: 300 (Light), 400 (Regular), 500 (Medium), 600 (SemiBold), 700 (Bold), 800 (ExtraBold)

### Font Usage
- **Main Headings**: `font-['Poppins',sans-serif] font-bold text-4xl`
- **Section Headings**: `font-['Poppins',sans-serif] font-semibold text-2xl`
- **Body Text**: `font-medium` for readability
- **Labels**: `font-semibold` for form fields

## Design Elements

### Cards & Containers
- **Border Radius**: `rounded-3xl` for modern, premium feel
- **Background**: `bg-white/90 backdrop-blur-sm` for glassmorphism effect
- **Shadows**: `shadow-2xl shadow-amber-200/30` for depth
- **Borders**: `border border-amber-100/50` for subtle definition

### Form Elements
- **Input Fields**: `border-2 border-amber-200/50 rounded-2xl`
- **Focus States**: `focus:ring-4 focus:ring-amber-200/30 focus:border-amber-400`
- **Hover Effects**: `hover:scale-[1.02]` for interactive feedback
- **Transitions**: `transition-all duration-300` for smooth animations

### Buttons
- **Primary**: Gradient background with rounded corners and shadows
- **Secondary**: Outlined with hover effects
- **States**: Loading, disabled, and hover states with appropriate styling

## Responsive Design

### Breakpoints
- **Mobile**: `px-4` (16px padding)
- **Tablet**: `sm:px-6` (24px padding)
- **Desktop**: `lg:px-8` (32px padding)

### Layout
- **Container**: `max-w-4xl mx-auto` for optimal reading width
- **Grid**: Responsive grid systems for form layouts
- **Spacing**: Consistent spacing using Tailwind's spacing scale

## Interactive Elements

### Hover Effects
- **Cards**: Subtle scale and shadow changes
- **Buttons**: Color transitions and scale effects
- **Links**: Underline animations and color changes

### Transitions
- **Duration**: 300ms for smooth, professional feel
- **Easing**: Default ease-out for natural movement
- **Properties**: All properties transition for cohesive experience

## Accessibility

### Color Contrast
- High contrast ratios for text readability
- Semantic color usage for error and success states
- Focus indicators for keyboard navigation

### Interactive States
- Clear hover and focus states
- Loading indicators for async operations
- Error messages with appropriate styling

## Implementation Notes

### CSS Classes
All styling is implemented using Tailwind CSS utility classes for consistency and maintainability.

### Font Loading
Poppins font is loaded via Google Fonts in `src/index.css`:
```css
@import url('https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;500;600;700;800&display=swap');
```

### Icon System
Uses Lucide React icons for consistent, scalable iconography throughout the interface.

## File Structure
- **Login Page**: `src/hotel-admin/pages/Login.jsx`
- **Register Page**: `src/hotel-admin/pages/Register.jsx`
- **Kitchen Login**: `src/hotel-admin/pages/KitchenLogin.jsx`
- **Admin Layout**: `src/hotel-admin/components/AdminLayout.jsx`
- **Home Page**: `src/hotel-admin/pages/Home.jsx`
- **Global Styles**: `src/index.css`

