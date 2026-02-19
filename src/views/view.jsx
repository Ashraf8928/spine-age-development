export default function View({ steps, currentStep, validationErrors = [] }) {
  const ActiveStep = steps[currentStep - 1]
  if (!ActiveStep) return null
  return <ActiveStep validationErrors={validationErrors} />
}
