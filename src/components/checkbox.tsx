export function Checkbox({ label, onChecked, onUnchecked }) {
  return (
    <label key={label}>
      <input
        type="checkbox"
        onChange={(e) => (e.target.checked ? onChecked() : onUnchecked())}
      />
      {label}
    </label>
  )
}
