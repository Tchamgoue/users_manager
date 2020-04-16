<?php

namespace App\Http\Middleware;

use Closure;

/**
 * CORS (Cross-origin resource sharing) handler.
 */
class Cors
{
    /**
     * Handle an incoming request.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \Closure  $next
     * @return mixed
     */
    public function handle($request, Closure $next)
    {
        //if method is OPTIONS then it is request to check cors access,
        // so we directly send a response with access allowed and OK as response status
        if ($request->method() == 'OPTIONS') {
            return response('Ok', 200)
                ->header('Access-Control-Allow-Origin', '*')    // * for all origins
                ->header("Access-Control-Allow-Methods", "POST, GET, OPTIONS, DELETE, PUT, PATCH, HEAD")
                ->header("Access-Control-Max-Age", "3600")
                ->header(
                    "Access-Control-Allow-Headers",
                    "content-disposition,response-type,content-type,access-control-allow-headers,access-control-request-headers,access-control-request-method,accept,origin,authorization,x-requested-with"
                );
        }

        return $next($request)
            ->header('Access-Control-Allow-Origin', '*')
            ->header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS, HEAD, PATCH')
            ->header(
                "Access-Control-Allow-Headers",
                "content-disposition,response-type,content-type,access-control-allow-headers,access-control-request-headers,access-control-request-method,accept,origin,authorization,x-requested-with"
            )
            ->header("Access-Control-Max-Age", "3600");
    }
}
