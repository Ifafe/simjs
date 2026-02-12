export default function Loading() {
      return (
            <div className="flex items-center justify-center min-h-screen bg-black">
                  <div className="relative">
                        <div className="w-16 h-16 border-4 border-red-600/30 border-t-red-600 rounded-full animate-spin"></div>
                        <div className="absolute inset-0 flex items-center justify-center">
                              <span className="text-xs font-bold text-white">SIMJS</span>
                        </div>
                  </div>
            </div>
      );
}
