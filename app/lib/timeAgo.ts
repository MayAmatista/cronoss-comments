export function timeAgo(dateString: string): string {
    const date = new Date(dateString);
    const now = new Date();
    const diffMs = now.getTime() - date.getTime();

    const seconds = Math.floor(diffMs / 1000);
    const minutes = Math.floor(seconds / 60);
    const hours = Math.floor(minutes / 60);
    const days = Math.floor(hours / 24);

    if (seconds < 60) return "hace unos segundos";
    if (minutes < 60) return `hace ${minutes} ${minutes === 1 ? "minuto" : "minutos"}`;
    if (hours < 24) return `hace ${hours} ${hours === 1 ? "hora" : "horas"}`;
    return `hace ${days} ${days === 1 ? "día" : "días"}`;
}
