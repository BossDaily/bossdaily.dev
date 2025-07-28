import UniqueLoading from "@/components/ui/morph-loading"

export default function Loading() {
  return (
    <div className="flex items-center justify-center min-h-screen bg-background">
      <div className="flex flex-col items-center space-y-4">
        <UniqueLoading 
          variant="morph" 
          size="lg" 
          className="text-primary"
        />
        <p className="text-muted-foreground text-lg font-medium animate-pulse">
          Loading...
        </p>
      </div>
    </div>
  )
}