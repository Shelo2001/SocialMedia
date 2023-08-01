export function getTimeDifference(sentTimestamp, type) {
    const now = new Date().getTime();
    const sentTime = new Date(sentTimestamp).getTime();
    const timeDifferenceInSeconds = Math.floor((now - sentTime) / 1000);

    if (type === "Registered") {
        if (timeDifferenceInSeconds < 60) {
            return `Registered at ${timeDifferenceInSeconds} seconds ago`;
        } else if (timeDifferenceInSeconds < 3600) {
            const minutes = Math.floor(timeDifferenceInSeconds / 60);
            return `Registered at ${minutes} minutes ago`;
        } else if (timeDifferenceInSeconds < 86400) {
            const hours = Math.floor(timeDifferenceInSeconds / 3600);
            return `Registered at ${hours} hours ago`;
        } else {
            const days = Math.floor(timeDifferenceInSeconds / 86400);
            return `Registered at ${days} days ago`;
        }
    } else {
        if (timeDifferenceInSeconds < 60) {
            return `sent ${timeDifferenceInSeconds} seconds ago`;
        } else if (timeDifferenceInSeconds < 3600) {
            const minutes = Math.floor(timeDifferenceInSeconds / 60);
            return `sent ${minutes} minutes ago`;
        } else if (timeDifferenceInSeconds < 86400) {
            const hours = Math.floor(timeDifferenceInSeconds / 3600);
            return `sent ${hours} hours ago`;
        } else {
            const days = Math.floor(timeDifferenceInSeconds / 86400);
            return `sent ${days} days ago`;
        }
    }
}
