"use client";

import { useRef } from 'react';
import { PlusCircle } from 'lucide-react';
import { MenuForm } from '@/components/ui/form/menu-form';
import { MenuTable } from '@/components/ui/menu-table/menu-table';
import { Button } from '@nextui-org/button';
import { Modal, ModalBody, ModalContent, ModalFooter, ModalHeader, useDisclosure } from '@nextui-org/modal';

export default function Page() {
    const { isOpen, onOpen, onOpenChange } = useDisclosure();
    const formRef = useRef<HTMLFormElement>(null);
    const menuTableRef = useRef<{ refresh: () => void }>(null);    

    const handleMenuAddClick = () => {
        onOpen();
    };

    const handleMenuAdd = (afterAddCallback: () => void) => {
        if (formRef.current) {
            formRef.current.dispatchEvent(new Event('submit', { cancelable: true, bubbles: true }));
        }
        afterAddCallback();
        menuTableRef.current?.refresh();
    };

    return (
        <div className="w-full flex items-center flex-col gap-4">
            <div className="ml-auto flex items-center gap-2">
                <Button size="sm" className="h-8 gap-1" onPress={handleMenuAddClick}>
                    <PlusCircle className="h-3.5 w-3.5" />
                    <span className="sr-only sm:not-sr-only sm:whitespace-nowrap">Add menu</span>
                </Button>
                <Modal isOpen={isOpen} onOpenChange={onOpenChange}>
                    <ModalContent>
                        {(onClose) => (
                            <>
                                <ModalHeader className="flex flex-col gap-1">Add new menu</ModalHeader>
                                <ModalBody>
                                    <MenuForm ref={formRef} />
                                </ModalBody>
                                <ModalFooter>
                                    <Button color="primary" variant="light" onPress={onClose}>
                                        Close
                                    </Button>
                                    <Button color="primary" onPress={() => handleMenuAdd(onClose)}>
                                        <div className="flex items-center justify-center gap-1">
                                            <span>Save</span>
                                        </div>
                                    </Button>
                                </ModalFooter>
                            </>
                        )}
                    </ModalContent>
                </Modal>
            </div>
            <MenuTable ref={menuTableRef} />
        </div>
    );
}