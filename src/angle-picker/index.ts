class AnglePicker {
    private element = document.createElement('div');
    private parentCircle = document.createElement('div');
    private childCircle = document.createElement('div');

    private parentCircleRect?: ClientRect | DOMRect;

    private isDragging = false;

    onChange?: (angle: number, radius: number, offsetX: number, offsetY: number) => void;

    private readonly colors = {
        dark: {
            parent: '#656565',
            child: '#e8e8e8'
        },
        light: {
            parent: '#ffffff',
            child: '#4c4c4c'
        }
    };

    constructor(parent: HTMLElement) {
        const colors = this.colors.dark;

        const parentCircle = this.parentCircle;
        parentCircle.style.width = '24px';
        parentCircle.style.height = '24px';
        parentCircle.style.borderRadius = '12px';
        parentCircle.style.display = 'inline-block';
        parentCircle.style.boxShadow = '0 0 2px rgba(0, 0, 0, 0.9)';
        parentCircle.style.backgroundColor = colors.parent;

        const childCircle = this.childCircle;
        childCircle.style.width = '6px';
        childCircle.style.height = '6px';
        childCircle.style.marginLeft = '-3px';
        childCircle.style.marginTop = '-3px';
        childCircle.style.position = 'relative';
        childCircle.style.borderRadius = '3px';
        childCircle.style.backgroundColor = colors.child;

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

            this.calculateCartesian();

            if (this.onChange) {
                this.onChange(degrees, this.radius, this.offsetX, this.offsetY);
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

    private calculatePolar() {
        const x = this.offsetX;
        const y = this.offsetY;

        const radians = Math.atan2(y, x);
        this._degrees = this.toDegrees(radians);
        this._radius = Math.sqrt(x*x + y*y);

        this.positionChildCircle(radians);
    }

    private calculateCartesian() {
        const radians = this.toRadians(this.angle);
        const radius = this.radius;

        this._offsetX = Math.cos(radians) * radius;
        this._offsetY = Math.sin(radians) * radius;
    }

    private _degrees: number = 0;
    set angle(degrees: number) {
        const radians = this.normalizeAngle180(this.toRadians(degrees));
        degrees = this.toDegrees(radians);
        if (this._degrees !== degrees) {
            this._degrees = degrees;
            this.calculateCartesian();
            this.positionChildCircle(radians);
        }
    }
    get angle(): number {
        return this._degrees;
    }

    private _radius: number = 0;
    set radius(value: number) {
        if (this._radius !== value) {
            this._radius = value;
            this.calculateCartesian();
        }
    }
    get radius(): number {
        return this._radius;
    }

    private _offsetX: number = 0;
    set offsetX(value: number) {
        if (this._offsetX !== value) {
            this._offsetX = value;
            this.calculatePolar();
        }
    }
    get offsetX(): number {
        return this._offsetX;
    }

    private _offsetY: number = 0;
    set offsetY(value: number) {
        if (this._offsetY !== value) {
            this._offsetY = value;
            this.calculatePolar();
        }
    }
    get offsetY(): number {
        return this._offsetY;
    }
}

document.addEventListener('DOMContentLoaded', () => {
    document.body.style.backgroundColor = '#323232';  // dark
    // document.body.style.backgroundColor = '#ececec';  // light
    const picker = new AnglePicker(document.body);

    picker.onChange = (angle, radius, offsetX, offsetY) => {
        console.log(angle, radius, offsetX, offsetY);
    };
});
