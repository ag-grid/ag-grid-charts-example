class AnglePicker {
    private element = document.createElement('div');
    private parentCircle = document.createElement('div');
    private childCircle = document.createElement('div');

    private parentCircleRect?: ClientRect | DOMRect;

    private isDragging = false;

    onChange?: (degrees: number) => void;

    constructor(parent: HTMLElement) {
        const parentCircle = this.parentCircle;
        parentCircle.style.width = '24px';
        parentCircle.style.height = '24px';
        parentCircle.style.borderRadius = '12px';
        parentCircle.style.display = 'inline-block';
        parentCircle.style.backgroundColor = '#656565';

        const childCircle = this.childCircle;
        childCircle.style.width = '6px';
        childCircle.style.height = '6px';
        childCircle.style.marginLeft = '-3px';
        childCircle.style.marginTop = '-3px';
        childCircle.style.position = 'relative';
        childCircle.style.borderRadius = '3px';
        childCircle.style.backgroundColor = '#e8e8e8';

        this.element.style.display = 'inline-block';

        parentCircle.appendChild(childCircle);

        this.element.appendChild(parentCircle);

        parent.appendChild(this.element);

        this.positionChildCircle(0);

        parentCircle.addEventListener('mousedown', this.onDragStart);
        document.addEventListener('mousemove', this.onDragMove);
        document.addEventListener('mouseup', this.onDragEnd);
    }

    destroy() {
        this.parentCircle.removeEventListener('mousedown', this.onDragStart);
        document.removeEventListener('mousemove', this.onDragMove);
        document.removeEventListener('mouseup', this.onDragEnd);
    }

    private onDragStart = (e: MouseEvent) => {
        this.isDragging = true;
        this.parentCircleRect = this.parentCircle.getBoundingClientRect();
        this.onDragMove(e);
    };

    private onDragMove = (e: MouseEvent) => {
        if (this.isDragging) {
            const rect = this.parentCircleRect!;

            const centerX = rect.width / 2;
            const centerY = rect.height / 2;

            let x = e.clientX - rect.left;
            let y = e.clientY - rect.top;

            const dx = x - centerX;
            const dy = y - centerY;

            const radians = Math.atan2(dy, dx);
            const degrees = this._degrees = this.toDegrees(radians);

            if (this.onChange) {
                this.onChange(degrees);
            }

            this.positionChildCircle(radians);
        }
    };

    private toRadians(degrees: number): number {
        return degrees / 180 * Math.PI;
    }

    private toDegrees(radians: number): number {
        return radians / Math.PI * 180;
    }

    private normalizeAngle180(radians: number): number {
        radians %= Math.PI * 2;
        if (radians < -Math.PI) {
            radians += Math.PI * 2;
        } else if (radians >= Math.PI) {
            radians -= Math.PI * 2;
        }
        return radians;
    }

    private onDragEnd = (e: MouseEvent) => {
        this.isDragging = false;
    };

    private positionChildCircle(radians: number) {
        const rect = this.parentCircleRect || this.parentCircle.getBoundingClientRect();

        const centerX = rect.width / 2;
        const centerY = rect.height / 2;

        this.childCircle.style.left = `${centerX + Math.cos(radians) * 8}px`;
        this.childCircle.style.top = `${centerY + Math.sin(radians) * 8}px`;
    }

    private _degrees: number = 0;
    set angle(degrees: number) {
        const radians = this.normalizeAngle180(this.toRadians(degrees));
        degrees = this.toDegrees(radians);
        if (this._degrees !== degrees) {
            this._degrees = degrees;
            this.positionChildCircle(radians);
        }
    }
    get angle(): number {
        return this._degrees;
    }
}

document.addEventListener('DOMContentLoaded', () => {
    document.body.style.backgroundColor = '#323232';
    new AnglePicker(document.body);
});
