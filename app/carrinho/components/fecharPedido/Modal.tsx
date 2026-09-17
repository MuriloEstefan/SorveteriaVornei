interface ModalProps {
    children: React.ReactNode;
}

export default function Modal({ children }: ModalProps) {
    return (
        <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50 p-1">
            <div className="bg-[#2e1740] w-[90%] max-w-md max-h-[95vh] overflow-y-auto rounded-3xl p-5">
                {children}
            </div>
        </div>
    );
}