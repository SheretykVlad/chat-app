export default function makePasswordVisible(visible, setVisible) {
    let passwordInput = document.querySelector('.password')
    if (!visible) {
        passwordInput.setAttribute('type', 'text')
        setVisible(true)
    } else {
        passwordInput.setAttribute('type', 'password')
        setVisible(false)
    }
}