export const darkModeHandle = () => {
  const darkMadeSwitcher = document.getElementById('toggleDarkMode')
const themeModeText = document.getElementById('themeModeText')
themeModeText.textContent = 'Light Mode'



if (localStorage.getItem('dark')) {
  document.documentElement.classList.add('dark')
  darkMadeSwitcher.checked = true
  themeModeText.textContent = 'Dark Mode'
}


darkMadeSwitcher.addEventListener('input', () => {
  document.documentElement.classList.toggle('dark')

  if (document.documentElement.classList.contains('dark')) {
    localStorage.setItem('dark', true)
    themeModeText.textContent = 'Dark Mode'
  } else {
    localStorage.removeItem('dark')
    darkMadeSwitcher.checked = false
    themeModeText.textContent = 'Light Mode'
  }
})
}