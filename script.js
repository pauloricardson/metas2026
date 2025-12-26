document.addEventListener('DOMContentLoaded', function () {
    const checkboxes = document.querySelectorAll('.checkbox-container input');
    const progressFill = document.getElementById('progress-fill');
    const progressPercentage = document.getElementById('progress-percentage');

    // Carregar estado salvo das checkboxes
    checkboxes.forEach(checkbox => {
        const savedState = localStorage.getItem(checkbox.id);
        if (savedState === 'checked') {
            checkbox.checked = true;
            checkbox.parentElement.parentElement.classList.add('completed');
        }

        // Adicionar evento para salvar estado
        checkbox.addEventListener('change', function () {
            if (this.checked) {
                localStorage.setItem(this.id, 'checked');
                this.parentElement.parentElement.classList.add('completed');
            } else {
                localStorage.removeItem(this.id);
                this.parentElement.parentElement.classList.remove('completed');
            }

            updateProgress();
        });
    });

    // Atualizar progresso
    function updateProgress() {
        const total = checkboxes.length;
        const checked = document.querySelectorAll('.checkbox-container input:checked').length;
        const percentage = Math.round((checked / total) * 100);

        progressFill.style.width = `${percentage}%`;
        progressPercentage.textContent = `${percentage}%`;
    }

    // Inicializar progresso
    updateProgress();

    // Efeito de digitação para o título (opcional)
    const title = document.querySelector('h1');
    const originalText = title.textContent;
    title.textContent = '';

    let i = 0;
    function typeWriter() {
        if (i < originalText.length) {
            title.textContent += originalText.charAt(i);
            i++;
            setTimeout(typeWriter, 50);
        }
    }

    // Iniciar efeito de digitação após um breve delay
    setTimeout(typeWriter, 500);
});