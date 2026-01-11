export default function ProductLoading() {
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="bg-white rounded-lg shadow-lg overflow-hidden">
          <div className="grid md:grid-cols-2 gap-8 p-6 md:p-8">
            <div className="h-96 bg-gray-200 rounded-lg animate-pulse" />
            <div className="space-y-4">
              <div className="h-4 bg-gray-200 rounded animate-pulse w-1/4" />
              <div className="h-8 bg-gray-200 rounded animate-pulse w-3/4" />
              <div className="h-12 bg-gray-200 rounded animate-pulse w-1/2" />
              <div className="space-y-2">
                <div className="h-4 bg-gray-200 rounded animate-pulse" />
                <div className="h-4 bg-gray-200 rounded animate-pulse" />
                <div className="h-4 bg-gray-200 rounded animate-pulse w-5/6" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}