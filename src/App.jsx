import './App.css'
import {
  Drawer,
  DrawerContent,
  DrawerHeader,
  DrawerTrigger,
} from "@/components/ui/drawer"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTrigger,
} from "@/components/ui/dialog"
import { useEffect, useState } from 'react'
import View from './views/view'
import StepOne from './views/stepOne'
import StepTwo from './views/stepTwo'
import StepThree from './views/stepThree'
import StepFour from './views/stepFour'
import StepFive from './views/stepFive'

import StepSeven from './views/stepSeven'
import { validateStepSeven } from './views/stepSeven'
import ResultScreen from './components/ResultScreen'
import { SpineFormProvider, useSpineForm } from './context/SpineFormContext'
import { validateStep, getStepKey } from './utils/validationUtils'
import videoData from './data/videoData'
import { useIsDesktop } from './utils/desktopSIzeCheck'

// Add or remove steps here — stepper & nav update automatically
const STEPS = [
  StepOne,
  StepTwo,
  StepThree,
  StepFour,
  StepFive,
  StepSeven,
]

function Stepper({ totalSteps, currentStep }) {
  return (
    <div style={{ display: 'flex', alignItems: 'center', padding: '0 4px' }}>
      {Array.from({ length: totalSteps }, (_, i) => {
        const n = i + 1
        const isActive = n === currentStep
        const isDone = n < currentStep
        return (
          <div key={n} style={{ display: 'flex', alignItems: 'center', flex: n < totalSteps ? 1 : 'none' }}>
            <div style={{
              width: 28, height: 28, borderRadius: '50%',
              background: isActive ? '#313283' : isDone ? '#313283' : '#D7D8FF',
              color: isActive || isDone ? '#fff' : '#313283',
              fontSize: 12, fontWeight: 700,
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              flexShrink: 0,
              transition: 'background 0.25s',
              opacity: isDone ? 0.7 : 1
            }}>
              {n}
            </div>
            {n < totalSteps && (
              <div style={{
                flex: 1, height: 2,
                background: isDone ? '#313283' : '#D7D8FF',
                transition: 'background 0.25s',
                opacity: isDone ? 0.7 : 1
              }} />
            )}
          </div>
        )
      })}
    </div>
  )
}

function FormContent({ showResult, validationError, validationErrors, handleContinue, goPrev }) {
  const {
    currentStep: contextStep,
  } = useSpineForm();

  const total = STEPS.length
  const currentStep = contextStep
  const isFirst = currentStep === 1
  const isLast = currentStep === total

  return (
    <>
      {showResult ? (
        <ResultScreen />
      ) : (
        <>
          <View steps={STEPS} currentStep={currentStep} validationErrors={validationErrors} />

          {validationError && (
            <div style={{
              padding: '0 24px',
              marginBottom: '8px'
            }}>
              <p style={{
                fontSize: '13px',
                color: '#ef4444',
                textAlign: 'center'
              }}>
                {validationError}
              </p>
            </div>
          )}
        </>
      )}
      
      <div
        style={{
          display: showResult ? 'none' : 'flex',
          alignItems: "center",
          justifyContent: "space-between",
          padding: "16px 24px 24px",
          background: "#fff",
          borderTop: "1px solid #f0f0f0",
          flexShrink: 0
        }}
      >
        <div style={{ display: 'flex', gap: 8 }}>
          <button
            onClick={goPrev}
            disabled={isFirst}
            style={{
              width: 40, height: 40, borderRadius: '50%',
              border: '1.5px solid #ddddf0', background: '#fff',
              fontSize: 20, cursor: isFirst ? 'not-allowed' : 'pointer',
              opacity: isFirst ? 0.3 : 1,
              display: 'flex', alignItems: 'center', justifyContent: 'center', lineHeight: 'normal', textAlign: 'center'
            }}
          >
            <img src='https://cdn.shopify.com/s/files/1/0248/7766/2271/files/Vector_4_1.svg?v=1772797214' alt="Previous" />
          </button>
          <button
            onClick={handleContinue}
            disabled={isLast}
            style={{
              width: 40, height: 40, borderRadius: '50%',
              border: '1.5px solid #ddddf0', background: '#fff',
              fontSize: 20, cursor: isLast ? 'not-allowed' : 'pointer',
              opacity: isLast ? 0.3 : 1,
              display: 'flex', alignItems: 'center', justifyContent: 'center', lineHeight: 'normal', textAlign: 'center'
            }}
          >
            <img src='https://cdn.shopify.com/s/files/1/0248/7766/2271/files/Vector_4.svg?v=1772797214' alt="Next" />
          </button>
        </div>
        <button
          onClick={handleContinue}
          style={{
            height: 44, padding: '0 32px', borderRadius: 22,
            background: '#313283', color: '#fff',
            fontSize: 15, fontWeight: 600, border: 'none', cursor: 'pointer', lineHeight: 'normal', textAlign: 'center'
          }}
        >
          {isLast ? 'Submit' : 'Continue'}
        </button>
      </div>
    </>
  )
}

function DrawerContent_Inner() {
  const {
    currentStep: contextStep,
    setCurrentStep,
    calculateScore,
    resetForm,
    userInfo,
    isComplete,
    selections
  } = useSpineForm();

  const [open, setOpen] = useState(false)
  const [showResult, setShowResult] = useState(false)
  const [validationError, setValidationError] = useState('')
  const [validationErrors, setValidationErrors] = useState([])
  const [isDesktop, setIsDesktop] = useState(false)

  const total = STEPS.length
  const currentStep = contextStep
  const isFirst = currentStep === 1
  const isLast = currentStep === total

  // Define step keys mapping
  const stepKeys = [
    "step_one",
    "step_two",
    "step_three",
    "step_four",
    "step_five"
  ];

  const currentStepKey = stepKeys[currentStep - 1];

  const currentVideo =
    videoData.find((v) => v[currentStepKey])?.[currentStepKey];

  // Check if desktop
  useEffect(() => {
    const checkDesktop = () => {
      setIsDesktop(window.innerWidth >= 768)
    }

    checkDesktop()
    window.addEventListener('resize', checkDesktop)

    return () => window.removeEventListener('resize', checkDesktop)
  }, [])

  const goNext = () => {
    if (currentStep < total) {
      setCurrentStep(currentStep + 1)
      setValidationError('')
      setValidationErrors([])
    }
  }

  const goPrev = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1)
      setValidationError('')
      setValidationErrors([])
    }
  }

  const handleContinue = () => {
    if (isLast) {
      // Validate Step 7 before submitting
      const validation = validateStepSeven(userInfo)
      if (!validation.isValid) {
        setValidationError('')
        return
      }

      // Calculate score and show result
      calculateScore()
      setShowResult(true)
    } else {
      // Validate steps 1-6 before proceeding
      const stepKey = getStepKey(currentStep)
      if (stepKey) {
        const validation = validateStep(stepKey, selections)
        if (!validation.isValid) {
          setValidationErrors(validation.unansweredQuestions)
          setValidationError(' ')
          return
        }
      }

      goNext()
    }
  }

  // Event listeners for opening/closing drawer
  useEffect(() => {
    const openHandler = () => setOpen(true)
    const closeHandler = () => setOpen(false)

    window.addEventListener("spine-age:open", openHandler)
    window.addEventListener("spine-age:close", closeHandler)

    return () => {
      window.removeEventListener("spine-age:open", openHandler)
      window.removeEventListener("spine-age:close", closeHandler)
    }
  }, [])

  // Reset to step 1 on open, and restore from localStorage if available
  useEffect(() => {
    if (open) {
      setShowResult(false)
      setValidationError('')
      setValidationErrors([])
      // Context will auto-load from localStorage
    }
  }, [open])

  // Handle drawer close - clear localStorage if assessment is complete
  const handleOpenChange = (newOpen) => {
    setOpen(newOpen)
    if (!newOpen && isComplete) {
      // Clear form and localStorage after successful completion
      resetForm()
      setShowResult(false)
    }
  }

  const isDesktopCheck = useIsDesktop();

  const headerContent = (
    <>
      <p className='font-baloo' style={{ fontSize: 24, fontWeight: 600, color: '#313283', margin: '0'}}>
        Find your Spine Age
      </p>
      {!showResult && <Stepper totalSteps={total} currentStep={currentStep} />}
    </>
  )

  const formContent = (
    <FormContent
      showResult={showResult}
      validationError={validationError}
      validationErrors={validationErrors}
      handleContinue={handleContinue}
      goPrev={goPrev}
    />
  )

  return (
    <>
      {isDesktop ? (
        <Dialog open={open} onOpenChange={handleOpenChange}>
          <DialogTrigger>Open</DialogTrigger>
          <DialogContent
            className={`max-w-300 w-[90%] p-0 grid ${showResult ? 'grid-cols-1' : 'grid-cols-2'} overflow-hidden`}
            style={{ height: '90vh' }}
          >
            {!showResult && (
              <div className="w-full h-full flex justify-center items-center bg-[#F5F5FF] relative overflow-hidden">

                {/* Step Videos */}
                {currentStep <= 5 && currentVideo?.video_url && (
                  <video
                    key={currentVideo.video_url}
                    autoPlay
                    muted
                    controls
                    loop
                    playsInline
                    className="w-full h-full object-cover cursor-pointer"
                    // poster={currentVideo.video_image_url || ""}
                  >
                    <source src={currentVideo.video_url} type="video/mp4" />
                  </video>
                )}

                {/* Form Image (StepSeven) */}
                {currentStep > 5 && (
                  <div className="flex justify-center items-center w-full h-full">
                    <img
                      className="w-[90%]"
                      src="https://cdn.shopify.com/s/files/1/0248/7766/2271/files/Rectangle_59.png?v=1771847444"
                      alt="Spine form"
                    />
                  </div>
                )}

              </div>
            )}
            <div style={{
              height: '100%',
              display: 'flex',
              flexDirection: 'column',
              overflow: 'hidden'
            }}>
              <DialogHeader style={{
                padding: '20px 24px 16px',
                borderBottom: '1px solid #f0f0f0',
                flexShrink: 0
              }}>
                {headerContent}
              </DialogHeader>
              <div style={{
                flex: 1,
                overflowY: 'auto',
                overflowX: 'hidden',
                display: 'flex',
                flexDirection: 'column',
                justifyContent : 'space-between'
              }}>
                {formContent}
              </div>
            </div>
          </DialogContent>
        </Dialog>
      ) : (
        <Drawer open={open} onOpenChange={handleOpenChange}>
          <DrawerTrigger>Open</DrawerTrigger>
          <DrawerContent>
            <DrawerHeader>
              {headerContent}
            </DrawerHeader>
            {formContent}
          </DrawerContent>
        </Drawer>
      )}
    </>
  )
}

function App() {
  return (
    <SpineFormProvider>
      <DrawerContent_Inner />
    </SpineFormProvider>
  )
}

export default App