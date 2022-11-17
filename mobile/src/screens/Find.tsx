import { Heading, Text, Toast, useToast, VStack } from "native-base";
import { Header } from "../components/Header";

import { Input } from "../components/Input";
import { Button } from "../components/Button";
import { useState } from "react";

export function Find() {

    const [isLoading, setIsLoading] = useState(false)

    const toast = useToast()

    async function handleJoinPool() {
        try {
            setIsLoading(true)
        } catch (error) {
            toast.show({
                title: 'Não foi possível encontrar oo bolão',
                placement: 'top',
                bgColor: 'red.500'
            })
        } finally {
            setIsLoading(false)
        }
    }

    return (
        <VStack flex={1} bgColor="gray.900">
            <Header title="Buscar por código" showBackButton />

            <VStack mt={8} mx={5} alignItems="center">

                <Heading fontFamily="heading" color="white" fontSize="xl" mb={8} textAlign="center">
                    Enconrte um bolão através de {'\n'}
                    seu código único
                </Heading>

                <Input mb={2} placeholder="Qual código do bolão" />

                <Button
                    title="BUSCAR BOLÃO"
                    isLoading={isLoading}
                    onPress={handleJoinPool}
                />

            </VStack>

        </VStack>
    )
}