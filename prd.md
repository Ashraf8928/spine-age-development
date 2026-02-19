
# PRD: Find Your Spine Age — Stepper Drawer Form

## Overview
A multi-step assessment form presented inside a Shadcn **Drawer** that guides users through a 7-step spinal health evaluation, calculates a final **Spine Score**, and displays a result summary.

---

## Goals
- Collect structured spinal health data across 6 assessment categories + 1 personal info step
- Calculate cumulative point score from user selections
- Display final Spine Age score after completion
- Provide seamless, mobile-friendly drawer UX

---

## Color Tokens
| Token | Hex | Usage |
|-------|-----|-------|
| Active / Primary | `#313283` | Selected button bg, headings, continue button, active stepper dot |
| Active Text | `#FFFFFF` | Text on active/selected buttons |
| Inactive Button Bg | `#D7D8FF` | Non-selected option buttons |
| Inactive Button Text | `#313283` | Text on non-selected buttons |
| Heading Color | `#313283` | All section & drawer headings |

---

## Architecture

### Context: `SpineFormContext`
Stores global form state accessible by all steps.

```ts
interface SpineFormState {
  currentStep: number;           // 1–7
  selections: {
    step_one: Record<number, { answerId: number; point: number }>;
    step_two: Record<number, { answerId: number; point: number }>;
    step_three: Record<number, { answerId: number; point: number }>;
    step_four: Record<number, { answerId: number; point: number }>;
    step_five: Record<number, { answerId: number; point: number }>;
    step_six: Record<number, { answerId: number; point: number }>;
  };
  userInfo: {
    full_name: string;
    email: string;
    phone_number: string;
  };
  totalScore: number;
  isComplete: boolean;
}
```

Context actions:
- `setAnswer(step, questionId, answerId, point)` — update a single answer
- `nextStep()` — advance stepper
- `prevStep()` — go back
- `submit()` — calculate total, mark complete

---

## Drawer Layout

```
┌─────────────────────────────────┐
│  Find Your Spine Age  (heading) │
│  ● — ○ — ○ — ○ — ○ — ○ — ○    │  ← 7-dot stepper
│─────────────────────────────────│
│                                 │
│  STEP LABEL (e.g. DAILY         │
│  OBSERVATIONS)                  │
│                                 │
│  Question 1                     │
│  [Yes]  [No]                    │
│                                 │
│  Question 2                     │
│  [Yes]  [No]  [Maybe]           │
│  ...                            │
│                                 │
├─────────────────────────────────┤
│  [<]  [>]          [Continue →] │  ← footer
└─────────────────────────────────┘
```

---

## Steps

| Step # | Key | Label | Question Type | Max Points |
|--------|-----|-------|--------------|------------|
| 1 | `step_one` | Daily Observations | Yes / No (1 or 0) | 5 |
| 2 | `step_two` | Posture Assessment | None / Mild-Moderate / Prominent (0/1/2) | 12 |
| 3 | `step_three` | Range of Motion | Normal / Mildly Reduced / Severely Reduced (0/1/2) | 10 |
| 4 | `step_four` | Functional Tests | Can Do Easily / Some Difficulty / Cannot (0/1/2) | 6 |
| 5 | `step_five` | Tenderness | None / Mild / Prominent (0/1/2) | 6 |
| 6 | `step_six` | Height Loss | No / Yes (0/2) | 2 |
| 7 | Personal Info | Your Details | Input fields (name, email, phone) | — |

**Total possible score: 41 points**

---

## Step 7 — Personal Info
Three input fields:
- **Full Name** — text input, required
- **Email** — email input, required, validated
- **Phone Number** — tel input, required

---

## Footer
- **Chevron Left `<`** — go to previous step (disabled on step 1)
- **Chevron Right `>`** — go to next step (same as Continue, alternate nav)
- **Continue button** — primary CTA, goes to next step; on step 7 = "Submit"

---

## Stepper UI
- 7 dots/circles shown horizontally
- Active step: filled circle, color `#313283`
- Completed step: checkmark or filled dot
- Inactive step: light circle `#D7D8FF`
- Connected by thin line between dots

---

## Scoring & Result Screen

After step 7 submit:
- Compute `totalScore = sum of all selected answer points`
- Display success screen inside drawer with:
  - ✅ Checkmark animation
  - "Assessment Complete!" heading
  - User's name
  - **Spine Score: XX / 41**
  - Score interpretation band:
    - 0–8: Excellent — Your spine is in great shape
    - 9–16: Good — Mild signs, worth monitoring
    - 17–25: Moderate — Consider professional evaluation  
    - 26–41: High — Strongly recommend specialist consultation
  - Score bar/gauge visual

---

## Non-Functional Requirements
- Mobile-first, responsive
- Drawer from bottom on mobile, side on desktop (Shadcn default)
- No page reload on step transition
- Accessible: keyboard navigable, ARIA labels on buttons
- Smooth fade/slide animation between steps

---

## Tech Stack
- React + Javascript
- Shadcn UI (Drawer component)
- Tailwind CSS
- React Context for state
- `lucide-react` for icons (ChevronLeft, ChevronRight, Check)


export const questionAnswer = [
  {
    step_one: [
      {
        id: 1,
        question: "Waking stiffness in neck or back",
        answer: [
          { id: 1, answer: "Yes", point: 1 },
          { id: 2, answer: "No", point: 0 }
        ]
      },
      {
        id: 2,
        question: "Difficulty rotating upper body",
        answer: [
          { id: 1, answer: "Yes", point: 1 },
          { id: 2, answer: "No", point: 0 }
        ]
      },
      {
        id: 3,
        question: "Noticed posture changes in recent years",
        answer: [
          { id: 1, answer: "Yes", point: 1 },
          { id: 2, answer: "No", point: 0 }
        ]
      },
      {
        id: 4,
        question: "Trouble tying shoes while standing",
        answer: [
          { id: 1, answer: "Yes", point: 1 },
          { id: 2, answer: "No", point: 0 }
        ]
      },
      {
        id: 5,
        question: "Numbness/tingling/weakness in arms or legs (non-injury)",
        answer: [
          { id: 1, answer: "Yes", point: 1 },
          { id: 2, answer: "No", point: 0 }
        ]
      }
    ]
  },
  {
    step_two: [
      {
        id: 1,
        question: "Uneven shoulder heights",
        answer: [
          { id: 1, answer: "None", point: 0 },
          { id: 2, answer: "Mild/Moderate", point: 1 },
          { id: 3, answer: "Prominent", point: 2 }
        ]
      },
      {
        id: 2,
        question: "Uneven hip heights",
        answer: [
          { id: 1, answer: "None", point: 0 },
          { id: 2, answer: "Mild/Moderate", point: 1 },
          { id: 3, answer: "Prominent", point: 2 }
        ]
      },
      {
        id: 3,
        question: "Forward head posture",
        answer: [
          { id: 1, answer: "None", point: 0 },
          { id: 2, answer: "Mild/Moderate", point: 1 },
          { id: 3, answer: "Prominent", point: 2 }
        ]
      },
      {
        id: 4,
        question: 'Hunched mid-back ("kyphosis")',
        answer: [
          { id: 1, answer: "None", point: 0 },
          { id: 2, answer: "Mild/Moderate", point: 1 },
          { id: 3, answer: "Prominent", point: 2 }
        ]
      },
      {
        id: 5,
        question: "Sway back/excessive low back arch",
        answer: [
          { id: 1, answer: "None", point: 0 },
          { id: 2, answer: "Mild/Moderate", point: 1 },
          { id: 3, answer: "Prominent", point: 2 }
        ]
      },
      {
        id: 6,
        question: "Rib hump/twist when bending forward",
        answer: [
          { id: 1, answer: "None", point: 0 },
          { id: 2, answer: "Mild/Moderate", point: 1 },
          { id: 3, answer: "Prominent", point: 2 }
        ]
      }
    ]
  },
  {
    step_three: [
      {
        id: 1,
        question: "Neck (look up/down, side-to-side)",
        answer: [
          { id: 1, answer: "Normal", point: 0 },
          { id: 2, answer: "Mildly Reduced", point: 1 },
          { id: 3, answer: "Severely Reduced/Painful", point: 2 }
        ]
      },
      {
        id: 2,
        question: "Bend forward (touch toes)",
        answer: [
          { id: 1, answer: "Normal", point: 0 },
          { id: 2, answer: "Mildly Reduced", point: 1 },
          { id: 3, answer: "Severely Reduced/Painful", point: 2 }
        ]
      },
      {
        id: 3,
        question: "Lean backward",
        answer: [
          { id: 1, answer: "Normal", point: 0 },
          { id: 2, answer: "Mildly Reduced", point: 1 },
          { id: 3, answer: "Severely Reduced/Painful", point: 2 }
        ]
      },
      {
        id: 4,
        question: "Side-bend left/right",
        answer: [
          { id: 1, answer: "Normal", point: 0 },
          { id: 2, answer: "Mildly Reduced", point: 1 },
          { id: 3, answer: "Severely Reduced/Painful", point: 2 }
        ]
      },
      {
        id: 5,
        question: "Rotate upper body",
        answer: [
          { id: 1, answer: "Normal", point: 0 },
          { id: 2, answer: "Mildly Reduced", point: 1 },
          { id: 3, answer: "Severely Reduced/Painful", point: 2 }
        ]
      }
    ]
  },
  {
    step_four: [
      {
        id: 1,
        question: "Sit to stand (no hands)",
        answer: [
          { id: 1, answer: "Can Do Easily", point: 0 },
          { id: 2, answer: "Some Difficulty", point: 1 },
          { id: 3, answer: "Cannot/Very Difficult", point: 2 }
        ]
      },
      {
        id: 2,
        question: "Stand on one foot (10+ seconds, both sides)",
        answer: [
          { id: 1, answer: "Can Do Easily", point: 0 },
          { id: 2, answer: "Some Difficulty", point: 1 },
          { id: 3, answer: "Cannot/Very Difficult", point: 2 }
        ]
      },
      {
        id: 3,
        question: "Walk several steps on toes and heels",
        answer: [
          { id: 1, answer: "Can Do Easily", point: 0 },
          { id: 2, answer: "Some Difficulty", point: 1 },
          { id: 3, answer: "Cannot/Very Difficult", point: 2 }
        ]
      }
    ]
  },
  {
    step_five: [
      {
        id: 1,
        question: "Neck (palpate along bones)",
        answer: [
          { id: 1, answer: "None", point: 0 },
          { id: 2, answer: "Mild", point: 1 },
          { id: 3, answer: "Prominent", point: 2 }
        ]
      },
      {
        id: 2,
        question: "Mid-back",
        answer: [
          { id: 1, answer: "None", point: 0 },
          { id: 2, answer: "Mild", point: 1 },
          { id: 3, answer: "Prominent", point: 2 }
        ]
      },
      {
        id: 3,
        question: "Lower back",
        answer: [
          { id: 1, answer: "None", point: 0 },
          { id: 2, answer: "Mild", point: 1 },
          { id: 3, answer: "Prominent", point: 2 }
        ]
      }
    ]
  },
  {
    step_six: [
      {
        id: 1,
        question: "Recent height loss (>1cm over 2–3 years)",
        answer: [
          { id: 1, answer: "No", point: 0 },
          { id: 2, answer: "Yes", point: 2 }
        ]
      }
    ]
  }
];
